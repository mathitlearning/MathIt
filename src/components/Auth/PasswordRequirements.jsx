function PasswordRequirements({
    password
}){


    const requirements = [

        {
            text:"At least 8 characters",
            valid: password.length >= 8
        },

        {
            text:"Contains uppercase letter",
            valid:/[A-Z]/.test(password)
        },

        {
            text:"Contains lowercase letter",
            valid:/[a-z]/.test(password)
        },

        {
            text:"Contains a number",
            valid:/[0-9]/.test(password)
        }

    ]


    return (

        <div>


            {
                requirements.map((item,index)=>(

                    <p key={index}>

                        {item.valid ? "✓" : "○"}

                        {" "}

                        {item.text}

                    </p>

                ))
            }


        </div>

    )

}


export default PasswordRequirements