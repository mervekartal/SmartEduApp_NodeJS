
const Course = require('../models/Course')
const Category = require('../models/Category')

exports.createCourse = async (req,res) => {
    //template hazır olmadığı için json formatında gönderildi.
    try{
    const course = await Course.create(req.body)
        res.status(201).json({
            status: 'success',
            course: course
        })
        //res.send('Yeni kurs oluşturuldu')
    }catch(err){
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

exports.getAllCourses = async (req,res) => {

    try{
    const categorySlug = req.query.categories
    const category = await Category.findOne({slug:categorySlug})

    let filter = {}
    if(categorySlug){
        filter = {category: category._id}
    }

    const courses = await Course.find(filter)
    const categories = await Category.find()

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: "courses"
        })
    }catch(error){
         res.status(400).json({
         status: 'fail',
         error

        })
    }
    //template hazır olmadığı için json dosyası gönderildi.
    // try{
    // const courses = await Course.find()
    //     res.status(200).json({
    //         status: 'success',
    //         courses: courses
    //     })
    // }catch(error){
    //     res.status(400).json({
    //         status: 'fail',
    //         error
    //     })
    // }
}
exports.getCourse = async (req,res) => {

    try{
    const course = await Course.findOne({slug: req.params.slug})
    const categories = await Category.find()
        res.status(200).render('course', {
            course,
            categories,
            page_name: "course"
        })
    }catch(err){
         res.status(400).json({
         status: 'fail',
         err

        })
    }
}
