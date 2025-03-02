import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputField from './Common/InputField'
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './Zod/validationSchema';
import { useForm } from "react-hook-form";
import Navigation from './routes/Navigation'
import { ContextProvider } from './Context/ContextProvider'

function App() {
  const [count, setCount] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });


  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };
  return (
    // <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
    //   <h2 className="text-lg font-semibold mb-4">Zod Validation Form</h2>
    //   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
    //     <InputField label="Name" name="name" placeholder="Enter your name" register={register} errors={errors} />
    //     <InputField label="Email" name="email" placeholder="Enter your email" register={register} errors={errors} />
    //     <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg">Submit</button>
    //   </form>
    // </div>
    <ContextProvider>
     <Navigation />
     </ContextProvider>
  );
}

export default App
