//function that handle the data validation 
export const handleDataValidation = (firstName,setFirstNameErr,lastName,setLastNameErr,age,setAgeErr,phone,setPhoneErr,email,setEmailErr,username,setUsernameErr,password,setPasswordErr,confirmedPassword,setConfirmedPasswordErr,isErr,setIsErr)=>{

    //Declare patterns
    const namePattern = /^[A-Za-z]{3,}$/; //name should have at least 3 characters
    const phonePattern = /^0(5|6|7)\d{8}$/; //name should be in these forms 05******** || 06******** || 07********
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; //universal email pattern (I guess)
    const userPattern = /^[A-Za-z]+([.\-_@# 0-9]?[A-Za-z]+)+$/; //username could be any character but at least 2 characters not end with a number or a special character
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#&.\-_]).{8,16}$/ //password should be at least 8 character and at maximum 16 character and shud have 1 lowerCase 1 upperCase 1 number and 1 special character

    //First name validation
    if(!firstName){
      setFirstNameErr(<p className='alert alert-danger err'>First Name Required</p>);
      setIsErr(true);
    }else if(!namePattern.test(firstName)){
      setFirstNameErr(<p className='alert alert-danger err'>Enter A Real Name</p>);
      setIsErr(true);
    }else{
      setFirstNameErr("");
      setIsErr(false);
    }

    //Age validation
    if(!age){
      setAgeErr(<p className='alert alert-danger err'>Age Required</p>);
      setIsErr(true);
    }else if(age < 13){
      setAgeErr(<p className='alert alert-danger err'>You Are Under The Legal Age</p>);
      setIsErr(true);
    }else if(age > 99){
      setAgeErr(<p className='alert alert-danger err'>Enter A Valid Age</p>);
      setIsErr(true);
    }else{
      setAgeErr("");
      setIsErr(false);
    }

    //Last name validation
    if(!lastName){
      setLastNameErr(<p className='alert alert-danger err'>Last Name Required</p>);
      setIsErr(true);
    }else if(!namePattern.test(lastName)){
      setLastNameErr(<p className='alert alert-danger err'>Enter A Real Name</p>);
      setIsErr(true);
    }else{
      setLastNameErr("");
      setIsErr(false);
    }

    //Phone validation
    if(!phone){
      setPhoneErr(<p className='alert alert-danger err'>Phone Required</p>);
      setIsErr(true);
    }else if(!phonePattern.test(phone)){
      setPhoneErr(<p className='alert alert-danger err'>Enter A Valid Phone</p>);
      setIsErr(true);
    }else{
      setPhoneErr("");
      setIsErr(false);
    }

    //Email validation
    if(!email){
      setEmailErr(<p className='alert alert-danger err'>Email Required</p>);
      setIsErr(true);
    }else if(!emailPattern.test(email)){
      setEmailErr(<p className='alert alert-danger err'>Enter A Valid Email</p>);
      setIsErr(true);
    }else{
      setEmailErr("");
      setIsErr(false);
    }

    //Username validation
    if(!username){
      setUsernameErr(<p className='alert alert-danger err'>User Required</p>);
      setIsErr(true);
    }else if(!userPattern.test(username)){
      setUsernameErr(<p className='alert alert-danger err'>Enter A Valid Username</p>);
      setIsErr(true);
    }else{
      setUsernameErr("");
      setIsErr(false);
    }

    //Password validation
    if(!password){
      setPasswordErr(<p className='alert alert-danger err'>Password Required</p>);
      setIsErr(true);
    }else if(!passwordPattern.test(password)){
      setPasswordErr(<p className='alert alert-danger err'>Enter A Valid Password</p>);
      setIsErr(true);
    }else{
      setPasswordErr("");
      setIsErr(false);
    }

    //Confirmed password validation
    if(!confirmedPassword){
      setConfirmedPasswordErr(<p className='alert alert-danger err'>Confirmation Required</p>);
      setIsErr(true);
    }else if(password !== confirmedPassword){
      setConfirmedPasswordErr(<p className='alert alert-danger err'>Passwords Should Be Identical</p>);
      setIsErr(true);
    }else{
      setConfirmedPasswordErr("");
      setIsErr(false);
    }

    if(isErr){
        return true;
    }else{
        return false;
    }
}