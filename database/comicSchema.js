const Realm = require('realm')
const COMIC_SCHEMA = "Comic"
const CHAPTER_SCHEMA = "Chapter"
const Promise = require('promise')

const ComicSchema = {
    name: COMIC_SCHEMA,
    primaryKey: 'uuid',
    properties: {
        uuid: 'string',
        title: 'string',
        thumbanail: 'string?',
        url: 'string',
        author: 'string?',
        category: 'string?',
        aboutUs: 'string?',
        timeCrawl: 'date?',
        detail: 'string?',
        status: 'string?',
        isCrawl: {type: 'bool', default: false},
    }
};

const ChapterSchema = {
    name: CHAPTER_SCHEMA,
    primaryKey: 'uuid',
    properties: {
        uuid: 'string',
        idComic: 'string?',
        urlChapter: 'string?',
        titleChapter: 'string?',
        timeCrawl: 'date?',
        timeUpdate: 'string?',
        indexChapter: 'int?',
        isCrawlImage: 'bool?'
    }
};

const databaseOptions = {
    path: 'realm/RealmComicDB.realm',
    schema: [ComicSchema,ChapterSchema],
    schemaVersion: 0,//Option
}

// function for ComicSchema

const insertComic = newComic => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        // Check if existing
        // filtered('uuid == $0',newComic.uuid)
        let fillterComic = realm.objects(COMIC_SCHEMA).filtered('uuid == $0',newComic.uuid)
        if (fillterComic.length > 0){
            reject("Comic with the same uuid exitst")
        }
        realm.write(() => {
            realm.create(COMIC_SCHEMA, newComic)
            console.log(newComic)
            resolve(newComic)
        })
    }).catch((error) => {
        reject(error)
    })
})

// function for ChapterSchema

const insertChapter = newChapter => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        //Check if existing
        // let fillterChapter = realm.objects(ComicSchema).filtered(`uuid='${newChapter.uuid}'`)
        // if (fillterComic.length > 0){
        //     reject("Chapter with the same urlChapter exitst")
        // }
        realm.write(() => {
            
        })
    }).catch((error) => {
        reject(error)
    })
})

//
module.exports = {
    insertComic,
    insertChapter
}