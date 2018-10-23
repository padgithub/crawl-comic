const Crawler = require("crawler");
const converbase64 = require("image-to-base64");
var admin = require("firebase-admin");

var serviceAccount = require("./service.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://comic-crawl.firebaseio.com"
});

var db = admin.firestore();

var c = new Crawler();
var c2 = new Crawler();
var c3 = new Crawler();

var addDoc = db.collection('list-comic')

var addDocChapter = db.collection('chapter')

const getList = index => {
  c.queue([
    {
      uri: `http://www.nettruyen.com/tim-truyen?page=${index}`,
      jQuery: true,
      // The global callback won't be called
      callback: function (error, res, done) {
        if (error) {
          console.log(error);
        } else {
          var $ = res.$;
          $('div[class="ModuleContent"]')
            .find(".row .item")
            .each(function (index, element) {
              const url = $(element)
                .find(".box_img a")
                .attr("href");
              const title = $(element)
                .find(".box_li .title")
                .text();
              const aboutUs = $(element)
                .find(".box_text")
                .text();
              const thumbnail = $(element)
                .find(".img_a")
                .attr("data-original");
              var imgBase64 = ""


              const a1 = $(element)
                .find("label")
                .eq(0)
                .text();

              var category = "";
              var author = "";
              var status = "";

              if (a1 === "Tên khác:") {
                category = $(element)
                  .find("p")
                  .eq(1)
                  .text()
                  .replace("Thể loại:", "");
                author = $(element)
                  .find("p")
                  .eq(2)
                  .text()
                  .replace("Tác giả:", "");
                status = $(element)
                  .find("p")
                  .eq(3)
                  .text()
                  .replace("Tình trạng:", "");
              } else {
                category = $(element)
                  .find("p")
                  .eq(0)
                  .text()
                  .replace("Thể loại:", "");
                author = $(element)
                  .find("p")
                  .eq(1)
                  .text()
                  .replace("Tác giả:", "");
                status = $(element)
                  .find("p")
                  .eq(2)
                  .text()
                  .replace("Tình trạng:", "");
              }

              // converbase64("https://3.bp.blogspot.com/-IflJ2NgvnDM/Wo9p39P-WvI/AAAAAAAAN24/WvPWygbYep4X3I1W1GsrB0iIn72YuzkrwCHMYCw/ban-trai-minh-tinh-buc-yeu") // you can also to use url
              // .then(
              //   (response) => {
              //     imgBase64 = response
              //   }
              // )
              // .catch(
              //   (error) => {
              //     console.log(error); //Exepection error....
              //   }
              // )
              // console.log(title)
              // console.log(thumbnail)
              // console.log(aboutUs)
              // console.log(url)
              // console.log(category)
              // console.log(status)
              // console.log(author)


              addDoc.add({
                title: title,
                thumbanail: thumbnail,
                url: url,
                author: author,
                category: category,
                aboutUs: aboutUs,
                status: status,
                dateCrawl: new Date(),
                isCrawl: false
              }).then(ref => {
                console.log('Added document comic with ID: ', ref.id);
                getListChapter(ref.id, url)
              }).catch(err => {
                console.log(err)
              })

            });
        }

        done();
      }
    }
  ]);
};

const getListChapter = (id, url) => {
  c2.queue([{
    uri: url,
    jQuery: true,

    // The global callback won't be called
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        var $ = res.$;
        $('#nt_listchapter')
          .find('.row')
          .each(function (index, element) {
            const urlChapter = $(element).find('.col-xs-5 a').attr('href')
            const titleChapter = $(element).find('.col-xs-5 a').text()
            const timeUpdate = $(element).find('.col-xs-4').text()
            if (timeUpdate != "Cập nhật") {
              addDocChapter.add({
                idComic: id,
                urlChapter: urlChapter,
                titleChapter: titleChapter,
                arrUrlImage: [],
                timeCrawl: new Date(),
                timeUpdate: timeUpdate
              }).then(ref => {
                console.log('Added document chapter with ID: ', ref.id);
                getListImageChap(ref.id,urlChapter)
              }).catch(err => {
                console.log(err)
              })

            }
          });
      }
      done();
    }
  }]);
}

const getListImageChap = (id,url) => {
  var arr = []
  c3.queue([{
    uri: url,
    jQuery: true,

    // The global callback won't be called
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        arr = []
        var $ = res.$;
        $('div[class="reading"]')
          .find('.page-chapter')
          .each(function (index, element) {
            const url = $(element).find('img').attr('src')
            arr.push(url)
          });
      }
      done();
      var washingtonRef = addDocChapter.doc(id);
          return washingtonRef.update({
            arrUrlImage: arr
          })
            .then(function () {
              console.log("Document successfully updated!");
            })
            .catch(function (error) {
              console.error("Error updating document: ", error);
            });
    }
  }]);
};

const run = () => {
  for (var index = 0; index < 2; index++) {
    getList(index);
    console.log(`Trang ${index}`);
  }
};



run();

