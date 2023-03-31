import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Todo from "./todoSection/Todo";

const BASE_URL = "https://todoplusappmernstack-production.up.railway.app"


const Dashboard = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/profile`, {
                withCredentials: true, credentials: 'include'
            })
            console.log(res)
            setUser(res.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser();
    }, [])


    const handleSignout = async () => {
            try {
                const res =  await axios.post(`${BASE_URL}/signout`, {
                    withCredentials: true, credentials: 'include'
                })

            if(res.data.success) {
                console.log(res.data)
                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }
    }



return(
        <div>  {(() => {
            if(user._id) {
              return  (
                        <div className="flex flex-col bg-white h-screen">
                            {/* Header  */}
                            <header className="grow-0 h-18">
                                <nav className="bg-gray-900 text-white p-4">
                                    <div className="flex justify-between text-3xl">
                                        <div className={"italic text-2xl"}>ToDo-plus+</div>
                                        <div className={"flex gap-2 mr-4"}>
                                            <img
                                                className="inline-block w-10 h-10 rounded-md"
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAA7ZJREFUWEeVV4FVFDEUnNkGpASoQKlArUCtQK1AqACoAKhAOgArECvgqABLwAZ2fD/J3ibZn91c3uNxd5v8TObPn58l3EEAAtK/MCX/7C/qm5PWtsLZ7ykQQchgdI4NhD0HcHaKgA4YYZ/FZhuHyRc5a0M2EjNdgLzDSjoC8APABwDvUsQdgEcAtyRf60z3KKAJaI1xSZ8B/ARgoLxhYL6TfMgf+jFLvfYzlNZJugRw0ZnlK5I2v7Mqopy7hyRLzVO24BnCJRjSZMPSZwDeZnNOSe7qElyvsk5IknYC3qZT/CJpqVucX5Kl6tOkKw48Lcu3XQTdDEk6BvCSNvkH4HggX2N9lHKVRtPWXwBv0vwTcvg7V1ObgSWgBpdRyLoPmwu/OMzs7MNnayeWDDCBL3uBO/Hr6nNIX56gELNwxSGJtVHLXfMdog5JmenlPsUo9OMlQKMeQHzKGZqxl6fIO8QhgI4BvaTCNJ85mcxvr6G0zygdUXgBzTxDik840DTV4MR16lz5ZaIn59c4WvlOJf1A8ovXdOcqs97I54EMTr5mtlOtZgw5IKrzOD5krcJ850+a+j59T60kJOwAHzJSOkYONYhVuACTOvL1y58yp+5hqMupl0SnXnaX+UxxLAH/CHwjh4ce78kXNxjaznbq9meNbn8zC75LPIWVeb5WnHgSdX1724a97sjeZbBgqOFxC3CjZE3Uqu0ogKz0JOCVwI7kJPZtpabNm1VW53WULD1f58tYUrCj7UrnOwJ3JG+3UXmirvJgTVXAT8arxfpogYssPgK0S1vDICcnamxhuEbpG6BrgPXN0FJhHhSuqTYqLDbfvMh8aT9SKhc3yTBhmbISWbpuPAHJ/uPjq4G8bL6ZOCqffWsf/xXQabyORCShl02AWpUiGcXxhAKeo6/Yza8ai0pwfcvYMt+a2s4jyY9ecgpRT11X0pmA6+zhAfbvO7K1HQFPWUGec+DN8ibpnFijjInpNE3799ltu1P1gmC2cOrdtRfMSdrLhGQkasMFVx9nD93YewROc1U0vd9pzh+SRblvu3NWLo76ozb1PjnOR5LTG0sSeMWP6QfAdarlWw607+XYRuXpNYaUbgD9SIDOSd4UZV/HrvJ8RQ6XeVk2d9pMa9xJo+w97iJ1nHA3rwu10EdMmf0F6Vh5Pm6Lt5+yJIlJBiF+fsiiubbEO2/Xv/GSyXVtzSa5SXUK3cISft/YzJmzFq7cMV/cU+8LvG0WF6EdQRYp206Iw8SGARV9KjXhtZL9D+VCszwVMFXYAAAAAElFTkSuQmCC"
                                                alt="user" />
                                            <span className={"text-2xl"}>{user && user.firstname}</span>
                                            <img title={"Signout"} className={"cursor-pointer"}
                                                onClick={() => handleSignout()}
                                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAxRJREFUWEelV+F5GyEMfboFkk3qDeJu0A3aTWpv0A3SDdJOUHuDjtAR0gVO+eAEiEMCLuFPbEeIh/T0JAgTiwCw2OnP3tZoI4bFfmYnEKzyGm8hEDgfNnGXvolxoAI0gHM0TF5EHRBbBsKFe0uHvXHU5OTDAWsAHc33ynwmxtPgWh7QfwB+E9GrJk0boW5ISx545Z8Avm6/hICT/JHPg3hFK8YriD8TLX+TeT9lhtOwYWX+AuBl5mg5eFc+4nhzEKIU/G0sGldWi4qZLwC+y3/uAN/sE3PsrHil/SCKMPaknsmVJEgASYSuRBQA5uXxX86MIsW8irQxiJacqfmyL97AK19AOUINoHG5aUAhTSlCVZznk7dL2ZVouRQtH8OJZcCcxN8DtKFLkt9LQQuoTpkHSctKSZkboVLSuXGlYmA+ATgT0Q+5nSb1O1IWKzXePayFiHSv7MaYmb8BeAYQD5ayPweAsvFGRDfbSU0D/e1dKWPW4lcA5eTP0cW0cgFZJcrr+gjQHwAhVWmV1Hy4jRFWXudSxhtfApjH3dVCWqrUNEptSDcRXdsQeWW/6/aRL4zn0GQ85dXOi5XuZfXxWoX1mNcIo5T4RnRJgSJw5bU5uF8GVaPVKlxdxtQhYx7ilU+gmJqH5EAA3fcpm+F0aSs1WwuppXUoXjZ+mTnwJ4D6pNrjTpE9ZfcZPy77FCHHd5x5KM08W9k3Cj7fcWoaqJQ5wmh3e15dYXySE+5ZGLULHShDW+Zbh0EMkYJO61guR18jjTD2OKQKr5SgAprGD5kGr7TMNFeD1OIgVuIIUMMV+UF6Wae5ytvNiPSY1DPqZ6ewC0jPRh7n7V42epc5YbLmIT3rzAxrEZAIXH9ibKa0Vld2gJoeZ7eXJtRZQhxAU7ob3/bhgSgNeGZTtnE65PYMqnqZImw163gz7TYTq4di97lTg65R/ZdJVB6KFYdsYdyPs7tKOYGx3e7QiqjCU/pXfkofKftDZx0xbujpVlkdLaMjmILpYpnpd4lD07bTNzcuM2BDdeFGP9oqr6CML2A4OODzDUq5nEGtG6NRAAAAAElFTkSuQmCC"/>
                                        </div>
                                    </div>
                                </nav>
                            </header>


                            <Todo />


                            {/* Footer  */}
                            <footer className="grow-0 bg-gray-900 p-4 w-full h-16 text-white italic">
                                <div>
                                    © ToDo-plus+
                                </div>
                            </footer>
                        </div>
                        )
            }
               return (<div className="font-bold text-blue-700 bg-gray-400 w-screen h-screen flex">

                   <Link
                       to="/"
                       className="text-center text-white bg-indigo-600 my-auto border-4 border-black rounded-xl  mx-auto p-12"
                       >
                       SignIn First
                   </Link>
                </div>)

        })()}
    </div>
)
}


export default Dashboard;