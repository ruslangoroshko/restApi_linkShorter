import React, {useContext, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

const CreatePage = () => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    const [link, setLink] = useState("")

    const saveHandler = async event => {
        try {

            const data = await request('/api/links/generate', 'POST', {from: link}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-8">
                <div className="row align-items-end">
                    <div className="col-9">
                        <label htmlFor="InputLink">Paste link</label>
                        <input 
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            type="email" className="form-control" id="InputLink" name="link" placeholder="Enter link"/>
                    </div>
                    
                    <div className="col-3">
                        <button 
                            onClick={saveHandler}
                            className="btn btn-primary w-100">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage