import React from 'react'
import Footer from '../components/footer/Footer'
import AllCustomerHeader from '../components/header/AllCustomerHeader'
import AllCustomerTable from '../components/tables/AllCustomerTable'
import AllExpensesHeader from '../components/header/AllExpenceHeader'
import AllExpensesTable from '../components/tables/AllExpenseTable'

const AllExpenses = () => {
  return (
    <div className="main-content">
        <div className="row">
            <div className="col-12">
                <div className="panel">
                    <AllExpensesHeader/>
                    {/* <AllCustomerHeader/> */}
                    <div className="panel-body">
                        <AllExpensesTable/>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default AllExpenses