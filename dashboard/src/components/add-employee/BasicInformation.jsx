import React from 'react'

const BasicInformation = () => {
  return (
    <div className="col-12">
        <div className="panel">
            <div className="panel-header">
                <h5>Basic Information</h5>
            </div>
            <div className="panel-body">
                <div className="row g-3">
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Employee ID</label>
                        <input type="text" className="form-control form-control-sm"/>
                    </div>
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control form-control-sm"/>
                    </div>
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control form-control-sm"/>
                    </div>
                    <div className="col-xxl-3 col-lg-4 col-sm-6">
                        <label className="form-label">Phone</label>
                        <input type="tel" className="form-control form-control-sm"/>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default BasicInformation