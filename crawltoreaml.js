const Crawler = require("crawler");
const UUID = require("uuid/v5")
const { insertComic } = require('./database/comicSchema')
var serviceAccount = require("./service.json")
const Promise = require('promise')

var c = new Crawler();

const getListComic = indexindex => new Promise((resolve,reject) => {
  var arr = []
  c.queue([
    {
      uri: `http://www.nettruyen.com/tim-truyen?page=${indexindex}`,
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

              const detaitl = $(element)
              .find("p").text()

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

              const uuid = `${UUID.URL}-${index}-${indexindex}`

            //   console.log(title)
            //   console.log(thumbnail)
            //   console.log(aboutUs)
            //   console.log(url)
            //   console.log(category)
            //   console.log(status)
            //   console.log(author)
            //   console.log(detaitl)
            //   console.log(uuid)
              const newComic = {
                uuid: uuid,
                title: title.trim(),
                thumbanail: thumbnail.trim(),
                url: url.trim(),
                author: author.trim(),
                category: category.trim(),
                aboutUs: aboutUs.trim(),
                detail: detaitl.trim(),
                status: status.trim(),
                dateCrawl: new Date(),
                isCrawl: false
              }

              arr.push(newComic)
            });
        }
        resolve(arr)
        done();
      }
    }
  ])
})

// const getList = indexindex => new Promise((resolve, reject) => {
//   var arr = []
//   c.queue([
//     {
//       uri: `http://www.nettruyen.com/tim-truyen?page=${indexindex}`,
//       jQuery: true,
//       // The global callback won't be called
//       callback: function (error, res, done) {
//         if (error) {
//           console.log(error);
//         } else {
//           var $ = res.$;
//           $('div[class="ModuleContent"]')
//             .find(".row .item")
//             .each(function (index, element) {
//               const url = $(element)
//                 .find(".box_img a")
//                 .attr("href");
//               const title = $(element)
//                 .find(".box_li .title")
//                 .text();
//               const aboutUs = $(element)
//                 .find(".box_text")
//                 .text();
//               const thumbnail = $(element)
//                 .find(".img_a")
//                 .attr("data-original");
//               var imgBase64 = ""

//               const detaitl = $(element)
//               .find("p").text()

//               const a1 = $(element)
//                 .find("label")
//                 .eq(0)
//                 .text();

//               var category = "";
//               var author = "";
//               var status = "";

//               if (a1 === "Tên khác:") {
//                 category = $(element)
//                   .find("p")
//                   .eq(1)
//                   .text()
//                   .replace("Thể loại:", "");
//                 author = $(element)
//                   .find("p")
//                   .eq(2)
//                   .text()
//                   .replace("Tác giả:", "");
//                 status = $(element)
//                   .find("p")
//                   .eq(3)
//                   .text()
//                   .replace("Tình trạng:", "");
//               } else {
//                 category = $(element)
//                   .find("p")
//                   .eq(0)
//                   .text()
//                   .replace("Thể loại:", "");
//                 author = $(element)
//                   .find("p")
//                   .eq(1)
//                   .text()
//                   .replace("Tác giả:", "");
//                 status = $(element)
//                   .find("p")
//                   .eq(2)
//                   .text()
//                   .replace("Tình trạng:", "");
//               }

//               const uuid = `${UUID.URL}-${index}-${indexindex}`

//             //   console.log(title)
//             //   console.log(thumbnail)
//             //   console.log(aboutUs)
//             //   console.log(url)
//             //   console.log(category)
//             //   console.log(status)
//             //   console.log(author)
//             //   console.log(detaitl)
//             //   console.log(uuid)
//               const newComic = {
//                 uuid: uuid,
//                 title: title.trim(),
//                 thumbanail: thumbnail.trim(),
//                 url: url.trim(),
//                 author: author.trim(),
//                 category: category.trim(),
//                 aboutUs: aboutUs.trim(),
//                 detail: detaitl.trim(),
//                 status: status.trim(),
//                 dateCrawl: new Date(),
//                 isCrawl: false
//               }

//               arr.push(newComic)

//             //   insertComic(newComic).then(Comic => {
//             //       console(Comic)
//             //   }).catch((error) => console.log(error))
//             // //   console.log(JSON.stringify(newComic))
//             });
//         }

//         done();
//       }
//   )}
//   ]);
// };

// const getListChapter = (id,uuid,url) => {
//   c.queue([{
//     uri: url,
//     jQuery: true,

//     // The global callback won't be called
//     callback: function (error, res, done) {
//       if (error) {
//         console.log(error);
//       } else {
//         var $ = res.$;
//         $('#nt_listchapter')
//           .find('.row')
//           .each(function (index, element) {
//             const urlChapter = $(element).find('.col-xs-5 a').attr('href')
//             const titleChapter = $(element).find('.col-xs-5 a').text()
//             const timeUpdate = $(element).find('.col-xs-4').text()
//             const indexChapter = parseInt(titleChapter.replace("Chapter ",""))
        
//             console.log(indexChapter)
          
//             if (timeUpdate != "Cập nhật") {

//             //   addDoc.doc(id).collection('chapter').add({
                
//             //     idComic: uuid,
//             //     idDocument: id,
//             //     urlChapter: urlChapter,
//             //     titleChapter: titleChapter,
//             //     arrUrlImage: [],
//             //     timeCrawl: new Date(),
//             //     timeUpdate: timeUpdate,
//             //     indexChapter: indexChapter,
//             //     isCrawlImage: false

//             //   }).then(ref => {
//             //     console.log('Added document chapter with ID: ', ref.id);
//             //      addDoc.doc(id).update({
//             //       isCrawl: true
//             //     })
                
//             //     getListImageChap(id,ref.id,urlChapter)
//             //   }).catch(err => {
//             //     console.log(err)
//             //   })

//             }
//           });
//       }
//       done();
//     }
//   }]);
// }

// const getListImageChap = (idComic,id,url) => {
//   c.queue([{
//     uri: url,
//     jQuery: true,

//     // The global callback won't be called
//     callback: function (error, res, done) {
//       if (error) {
//         console.log(error);
//       } else {
//         var arr = []
//         var $ = res.$;
//         $('div[class="reading"]')
//           .find('.page-chapter')
//           .each(function (index, element) {
//             const url = $(element).find('img').attr('src')
//             arr.push(url)
//           });
        
//           if ( arr.length > 0 ){
//             addDoc.doc(idComic).collection('chapter').doc(id).update({
//               arrUrlImage: arr,
//               isCrawlImage: true
//             })
//               .then(function () {
//                 console.log("Document successfully updated!");
//               })
//               .catch(function (error) {
//                 console.error("Error updating document: ", error);
//               });
//           }
//       }
//       done();
//     }
//   }]);
// };

const run = () => {
  for (var index = 1; index < 397; index++) {
    getList(index);
    console.log(`Trang ${index}`);
  }
};
// run();

module.exports = {
  getListComic
}

