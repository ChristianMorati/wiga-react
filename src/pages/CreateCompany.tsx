import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';
import useCompanyStore from "../store/CompanyReducer";

type FormData = {
  name: string;
  cnpj: string;
  email: string;
  password: string;
};

const CreateCompany: React.FC = () => {
    const [buttonsIsLoading, setButtonsIsLoading] = useState<{
        checkingCnpj: boolean;
        checkingEmail: boolean;
    }>({
        checkingCnpj: false,
        checkingEmail: false,
    });
    const [step, setStep] = useState<number>(1);
    const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<FormData>({ mode: "onChange" });
    const navigate = useNavigate();
    const { setCompany } = useCompanyStore();

    const checkIfCnpjIsInUse = async (): Promise<boolean> => {
        try {
            setButtonsIsLoading((prev) => ({ ...prev, checkingCnpj: true }));
            const response = await fetch("https://localhost:7240/api/Company/cnpj-is-in-db", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ companyCnpj: getValues("cnpj") }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Erro ao validar CNPJ:", errorMessage);
                toast.error("Erro ao validar CNPJ: " + errorMessage);
                return false;
            }

            const cnpjIsUsed = await response.json();
            if (cnpjIsUsed) {
                console.log("CNPJ já está em uso.");
                toast.error("CNPJ já está em uso.");
                return false;
            }

            console.log("CNPJ disponível.");
            return true;
        } catch (error) {
            console.error("Erro ao verificar CNPJ:", error);
            toast.error("Erro inesperado ao verificar CNPJ.");
            return false;
        } finally {
            setButtonsIsLoading((prev) => ({ ...prev, checkingCnpj: false }));
        }
    };

    const checkIfEmailIsInUse = async (): Promise<boolean> => {
        try {
            setButtonsIsLoading((prev) => ({ ...prev, checkingEmail: true }));
            const response = await fetch("https://localhost:7240/api/Company/email-is-in-db", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: getValues("email") }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Erro ao validar email:", errorMessage);
                toast.error("Erro ao validar email: " + errorMessage);
                return false;
            }

            const emailIsUsed = await response.json();
            if (emailIsUsed) {
                console.log("Email já está em uso.");
                toast.error("Email já está em uso.");
                return false;
            }

            console.log("Email disponível.");
            return true;
        } catch (error) {
            console.error("Erro ao verificar Email:", error);
            toast.error("Erro inesperado ao verificar Email.");
            return false;
        } finally {
            setButtonsIsLoading((prev) => ({ ...prev, checkingEmail: false }));
        }
    };

    const handleNextStep = async (fieldsToValidateArray: ("name" | "cnpj" | "email" | "password")[], nextStep: number) => {
        const isValid = await trigger(fieldsToValidateArray);

        if (!isValid) {
            console.log("Formulário inválido");
            toast.error("Formulário inválido");
            return;
        }

        let canGoNext = true; // Default to true

        switch (nextStep) {
            case 2:
                canGoNext = await checkIfCnpjIsInUse();
                break;
            case 3:
                canGoNext = await checkIfEmailIsInUse();
                break;
        }

        if (canGoNext) {
            setStep(nextStep);
        }
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const companyData = {
            name: data.name,
            cnpj: data.cnpj,
            email: data.email,
            password: data.password,
        };

        try {
            const response = await fetch("https://localhost:7240/api/Company", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(companyData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Company created successfully:", responseData);
                setCompany(responseData);
                navigate("/create-shop");
            } else {
                console.error("Failed to create company");
            }
        } catch (error) {
            console.error("Error creating company:", error);
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto m-2 p-4 bg-white rounded-xl">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Criar Empresa</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="name" className="text-left text-sm font-medium text-gray-700">
                                    Nome da Empresa
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name", { required: "Company name is required" })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-gray-900"
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col gap-3">
                                <label htmlFor="cnpj" className="text-left text-sm font-medium text-gray-700">
                                    CNPJ
                                </label>
                                <input
                                    id="cnpj"
                                    type="text"
                                    {...register("cnpj", {
                                        required: "CNPJ is required",
                                        pattern: {
                                            value: /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/,
                                            message: "Invalid CNPJ format",
                                        },
                                    })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-gray-900"
                                />
                                {errors.cnpj && <p className="text-red-500 text-xs">{errors.cnpj.message}</p>}
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => handleNextStep(["name", "cnpj"], 2)}
                                    disabled={buttonsIsLoading.checkingCnpj}
                                    className="flex items-center gap-2 rounded-lg bg-green-700 py-3 px-6 text-white disabled:opacity-50"
                                    type="button"
                                >
                                    Avançar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="email" className="text-left text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-gray-900"
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="password" className="text-left text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Password must be at least 8 characters long, with an uppercase, lowercase, number, and special character",
                                        },
                                    })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-gray-900"
                                />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="rounded-lg bg-red-500 py-3 px-6 text-white"
                                >
                                    Voltar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleNextStep(["password", "email"], 3)}
                                    disabled={buttonsIsLoading.checkingEmail}
                                    className="rounded-lg bg-green-700 py-3 px-6 text-white disabled:opacity-50"
                                >
                                    Avançar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-gray-800">
                                <FaCheckCircle className="text-green-600" /> Confirme os Dados
                            </h2>
                            <p>
                                <strong>Nome da Empresa:</strong> {getValues("name")}
                            </p>
                            <p>
                                <strong>CNPJ:</strong> {getValues("cnpj")}
                            </p>
                            <p>
                                <strong>Email:</strong> {getValues("email")}
                            </p>
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="flex items-center gap-2 rounded-lg bg-gray-200 py-3 px-6 font-bold"
                                >
                                    Editar
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-green-700 py-3 px-6 text-white font-bold"
                                >
                                    Criar Conta
                                </button>
                            </div>
                        </div>
                    )}
                </form>
                <hr className="my-4 border-slate-300" />
            </div>
        </>
    );
};
export default CreateCompany;
