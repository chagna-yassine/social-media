//function that handle the data validation 
export const handleDataValidation = (firstName,setFirstNameErr,lastName,setLastNameErr,age,setAgeErr,phone,setPhoneErr,email,setEmailErr,username,setUsernameErr,password,setPasswordErr,confirmedPassword,setConfirmedPasswordErr,isErr,setIsErr,t)=>{

  //Declare patterns
  const namePattern = /^[A-Za-z]{3,}$/; //name should have at least 3 characters
  const phonePattern = /^0(5|6|7)\d{8}$/; //name should be in these forms 05******** || 06******** || 07********
  const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; //universal email pattern (I guess)
  const userPattern = /^[A-Za-z]+([.\-_@# 0-9]?[A-Za-z]+)+$/; //username could be any character but at least 2 characters not end with a number or a special character
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#&.\-_]).{8,16}$/ //password should be at least 8 character and at maximum 16 character and shud have 1 lowerCase 1 upperCase 1 number and 1 special character

  //First name validation
  if(!firstName){
    setFirstNameErr(<p className='alert alert-danger err'>{t('signup.Errs.firstNameErr')}</p>);
    setIsErr(true);
  }else if(!namePattern.test(firstName)){
    setFirstNameErr(<p className='alert alert-danger err'>{t('signup.Errs.invalidNameErr')}</p>);
    setIsErr(true);
  }else{
    setFirstNameErr("");
    setIsErr(false);
  }

  //Age validation
  if(!age){
    setAgeErr(<p className='alert alert-danger err'>{t('signup.Errs.ageErr')}</p>);
    setIsErr(true);
  }else if(age < 13){
    setAgeErr(<p className='alert alert-danger err'>{t('signup.Errs.underAgeErr')}</p>);
    setIsErr(true);
  }else if(age > 99){
    setAgeErr(<p className='alert alert-danger err'>{t('signup.Errs.invalidAErr')}</p>);
    setIsErr(true);
  }else{
    setAgeErr("");
    setIsErr(false);
  }

  //Last name validation
  if(!lastName){
    setLastNameErr(<p className='alert alert-danger err'>{t('signup.Errs.lastNameErr')}</p>);
    setIsErr(true);
  }else if(!namePattern.test(lastName)){
    setLastNameErr(<p className='alert alert-danger err'>{t('signup.Errs.invalidNameErr')}</p>);
    setIsErr(true);
  }else{
    setLastNameErr("");
    setIsErr(false);
  }

  //Phone validation
  if(!phone){
    setPhoneErr(<p className='alert alert-danger err'>{t('signup.Errs.phoneErr')}</p>);
    setIsErr(true);
  }else if(!phonePattern.test(phone)){
    setPhoneErr(<p className='alert alert-danger err'>{t('signup.Errs.invalidPhoneErr')}</p>);
    setIsErr(true);
  }else{
    setPhoneErr("");
    setIsErr(false);
  }

  //Email validation
  if(!email){
    setEmailErr(<p className='alert alert-danger err'>{t('signup.Errs.emailErr')}</p>);
    setIsErr(true);
  }else if(!emailPattern.test(email)){
    setEmailErr(<p className='alert alert-danger err'>{t('signup.Errs.invalidEmailErr')}</p>);
    setIsErr(true);
  }else{
    setEmailErr("");
    setIsErr(false);
  }

  //Username validation
  if(!username){
    setUsernameErr(<p className='alert alert-danger err'>{t('signup.Errs.usernameErr')}</p>);
    setIsErr(true);
  }else if(!userPattern.test(username)){
    setUsernameErr(<p className='alert alert-danger err'>{t('signup.Errs.invalidUsernameErr')}</p>);
    setIsErr(true);
  }else{
    setUsernameErr("");
    setIsErr(false);
  }

  //Password validation
  if(!password){
    setPasswordErr(<p className='alert alert-danger err'>{t('signup.Errs.passwordErr')}</p>);
    setIsErr(true);
  }else if(!passwordPattern.test(password)){
    setPasswordErr(<p className='alert alert-danger err'>{t('signup.Errs.invalidPasswordErr')}</p>);
    setIsErr(true);
  }else{
    setPasswordErr("");
    setIsErr(false);
  }

  //Confirmed password validation
  if(!confirmedPassword){
    setConfirmedPasswordErr(<p className='alert alert-danger err'>{t('signup.Errs.confirmedPasswordErr')}</p>);
    setIsErr(true);
  }else if(password !== confirmedPassword){
    setConfirmedPasswordErr(<p className='alert alert-danger err'>{t('signup.Errs.indenticalPasswordErr')}</p>);
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