import connectDB from "@/lib/db"
import { Category } from "@/models/CategoryModel"

const AllCategories = async ()=>{
    await connectDB()
    const categories = await Category.find({})
    return categories
}