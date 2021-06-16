import { Request, Response } from "express"
import { PlanTypes, Progress ,NewPlan,File} from "../types/plan"
import * as path from "path"
import Plan , {validateData} from "../models/plan"
import ErrorHandler from "../utilities/ErrorHandler"
import isDefined from "../utilities/isDefined"


// POST /new-plan
export const createPlan = async(req:Request,res:Response,next) => {
  const {
    title,
    description,
    startDate_date,
    startDate_month,startDate_year,endDate_date,
    endDate_month,endDate_year,priority,category,type
  } = req.body as NewPlan
  const validation = validateData(req.body)
  const plan = await Plan.findOne()
  console.log(req.body)
  console.log(validation)
  // const isDef = isDefined(data)
  // if(!isDef.isValid) return next(new ErrorHandler(`${isDef.errors.join(", ")} are required.`,400))
  let IMG;
  // if(req.files.image) {
  //   const image = req.files.image as File
  //   const imageFileName = `image-${Date.now()}.${image.mimetype.split("/")[1]}`
  //   console.log(image)
  //   console.log(imageFileName)
  //   await image.mv(path.join(__dirname,'../uploads/images/',imageFileName))
  //   IMG = imageFileName
  // }
  const newPlan = await Plan.create({
    title,
    description,
    priority,
    type,
    category,
    startDate: {
      date: startDate_date,
      month: startDate_month,
      year: startDate_year
    },
    endDate: {
      date: endDate_date,
      month: endDate_month,
      year: endDate_year
    },
    status: Progress.IN_PROGRESS,
    image: IMG || "default.png",
    dateCreated: new Date()
  })
  res.status(201).json({
    succuss: 1,
    message: "Plan successfully created.",
    data: newPlan
  })
}
// GET /today
export const todayPlan = async(req:Request,res:Response,next) => {
  const date = new Date()
  const todaysPlan = await Plan.findOne().and([
    {"startDate.date":date.getDate()},
    {"startDate.month":date.getMonth()+1},
    {"startDate.year":date.getFullYear()}
  ])
  if(!todaysPlan) return next (new ErrorHandler("There is no plan for today.",404))
  res.status(200).json({
    success: 1,
    message: "Data successfully fetched.",
    data:todaysPlan
  })
}

// GET /current-month
export const currentMonthPlans = async(req:Request,res:Response,next) => {
  const date = new Date()
  const currentMonth = date.getMonth() + 1
  const plans = await Plan.find({"startDate.month":currentMonth})
  console.log(plans)
  res.status(200).json({
    success: 1,
    message: "",
    data: plans
  })
}
// GET /current-year
export const currentYearPlans = async(req:Request,res:Response,next) => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const plans = await Plan.find({"startDate.year":currentYear})
  console.log(plans)
  res.status(200).json({
    success: 1,
    message: "",
    data: plans
  })
}
// GET /daily
export const dailyPlan = async(req:Request,res:Response,next) => {
  const date = new Date()
  const daily = date.getDate()
  const plans = await Plan.find({"startDate.date":daily})
  console.log(plans)
  res.status(200).json({
    success: 1,
    message: "",
    data: plans
  })
}
// GET /monthly
export const monthlyPlans = async(req:Request,res:Response,next) => {
  const date = new Date()
  const monthly = date.getMonth()
  const plans = await Plan.find({"startDate.month":monthly})
  console.log(plans)
  res.status(200).json({
    success: 1,
    message: "",
    data: plans
  })
}
// GET /yearly
export const yearlyPlans = async(req:Request, res:Response,next) => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const plans = await Plan.find({"startDate.year": {$gte:currentYear,$lte: currentYear+10}})
  res.status(200).json({
    success: 1,
    message: plans.length > 0 ? `Found ${plans.length} plans.`:"No plan found.",
    data: plans
  })
}
// GET /categories
// DELETE /delete-plans
export const deletePlans = async(req:Request,res:Response,next) => {
  await Plan.deleteMany({})
  res.status(200).json({
    success: 1,
    message: "Deleted all plans successfully."
  })
}