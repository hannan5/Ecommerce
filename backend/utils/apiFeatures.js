class ApiFeatures {
    constructor(query, querystr) {
        this.query = query
        this.querystr = querystr
    }
    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: 'i'
            }
        } : {}
        // console.log(keyword)
        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const fitercategory = { ...this.querystr }
        const removefield = ['keyword', 'page', 'limit']
        removefield.forEach((key) => delete [key])

        let querystr = JSON.stringify(fitercategory)
        // console.log(querystr)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        // console.log(querystr)


        this.query = this.query.find(JSON.parse(querystr))
        return this
    }

    pagination(productPerPage) {
        let currentpage = this.querystr.page || 1
        // 5 * (2 - 1)
        const skip = productPerPage * (currentpage - 1)

        this.query = this.query.limit(productPerPage).skip(skip)

        return this
    }
}

module.exports = ApiFeatures