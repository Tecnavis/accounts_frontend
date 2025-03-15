import React, { useState } from 'react'
import ProductDataTab from './ProductDataTab'
import SaleData from './SaleData'
import ExpenseData from './ExpenseData'

const ExpensesData = () => {
    const [productDataBtn,SetProductDataBtn] = useState(false)
    const handleProductDataBtn = () => {
        SetProductDataBtn(!productDataBtn)
    }
  return (
    <div className="panel mb-30">
        <div className="panel-header">    
        </div>
        <div className={`panel-body ${productDataBtn? 'd-none':''}`}>
           {/* <ProductDataTab/> */}
           <ExpenseData/>
           {/* <SaleData/> */}
        </div>   
    </div>
  )
}

export default ExpensesData