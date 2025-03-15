import React from 'react'
import Footer from '../components/footer/Footer'
import { Link } from 'react-router-dom'
import AddNewBreadcrumb from '../components/breadcrumb/AddNewBreadcrumb'
import NewProductTitle from '../components/add-new-product/NewProductTitle'
import ProductDescription from '../components/add-new-product/ProductDescription'
import SalesData from '../components/add-new-product/SalesData'
import CategorySection from '../components/add-new-product/CategorySection'
import ProductTags from '../components/add-new-product/ProductTags'
import ExpensesData from '../components/add-new-product/Expenses'

const AddExpenses = () => {
  return (
    <div className="main-content">
        <AddNewBreadcrumb link={"/allExpenses"} title={'Add New Expenses'}/>
        <div className="row g-4">
            <div className="col-xxl-12 col-lg-12">  
                <ExpensesData/>             
            </div>
        </div>
        <Footer/>
    </div>
  )
}
export default AddExpenses