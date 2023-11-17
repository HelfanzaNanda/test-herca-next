"use client";
import { LoadingButton } from "@/components/Button/Loading";
import FormInput from "@/components/Form/FormInput";
import { GlobalResponse, METHOD_POST, fetcher } from "@/lib/api-instance";
import { setAuth } from "@/lib/authentication";
import { toastSuccess } from "@/lib/my-toast";
import { LoginInput, LoginInputSchema, LoginResult } from "@/models/Login";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import useSWRMutation from 'swr/mutation'


export default function Login() {

    const router = useRouter();

    const { trigger, isMutating } = useSWRMutation("login", fetcher, {
        onSuccess : (res : GlobalResponse<LoginResult>) => {
            console.log('res : ', res);   
            if (res.status) {
                toastSuccess("Logged in successfully");
                setAuth(res.data);
                router.push("/");
            }
        }
    });

    const formik = useFormik<LoginInput>({
        initialValues: { email: "", password: "" },
        onSubmit: async () => {
            const { email, password } = formik.values;
            trigger({
                method : METHOD_POST,
                body : {
                    email, password
                }
            });


        },
        validationSchema: LoginInputSchema,
    })

    const handleFormInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };


    return (
        <div className="w-screen h-screen grid grid-cols-2">
            <div className="bg-blue-400 flex flex-col items-center justify-center px-32">
                <div className="font-bold text-4xl mb-3">MyApp</div>
                {/* <div className="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit a perferendis nulla voluptatibus quasi vel natus architecto sapiente fugit illo, aliquid praesentium rem magni doloribus. Reprehenderit ratione vitae quaerat dolorem, magni similique debitis fugiat? Aliquam, quibusdam a delectus adipisci aut illum sint eveniet quo voluptatum eos exercitationem totam. Omnis, quos illo? Delectus iusto pariatur rerum ipsum, quae minus sapiente voluptate natus ipsam exercitationem nam cumque atque blanditiis optio, recusandae id vel tempora corrupti nisi? Corrupti fuga maiores asperiores ullam dolorum? Iusto culpa, sint minus libero similique eius veritatis a rerum illum sit aspernatur laudantium tempora ipsum saepe iste exercitationem eligendi!</div> */}
            </div>
            <div>
                <div className="p-44">
                    <div className="text-2xl font-semibold mb-2">Selamat Datang</div>
                    {/* <div className="mb-10">silahkan masukkan email atau nomor telefon dan password anda untuk mulai menggunakan aplikasi</div> */}

                        <form className="space-y-6" 
                            onSubmit={formik.handleSubmit}>
                                <FormInput label="Email" name="email" type="text" touched={formik.touched} value={formik.values.email} onChange={handleFormInput} errors={formik.errors} />
                                <FormInput label="Password" name="password" type="password" touched={formik.touched} value={formik.values.password} onChange={handleFormInput} errors={formik.errors} />
                                <LoadingButton loading={isMutating} >
                                    Login
                                </LoadingButton>
                        </form>

                </div>
            </div>
        </div>
    )
}