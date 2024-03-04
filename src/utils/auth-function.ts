interface signupFunctionProps{
    username: string;
    email: string;
    password: string;
    confirmPasssword: string;
}

interface forgotPasswordFunctionProps {
    email: string;
}

export const signupFunction= async ({username, email, password, confirmPasssword}: signupFunctionProps) =>{
    return { message: 'signup'};
}

export const forgotPasswordFunction= async ({email}:forgotPasswordFunctionProps) => { 
    return { message: 'forgotPassword' };
}