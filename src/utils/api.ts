// src/utils/api.ts
export const checkIfCnpjIsInUse = async (cnpj: string, setButtonsIsLoading: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        setButtonsIsLoading((prev: any) => ({ ...prev, checkingCnpj: true }));
        const response = await fetch("https://localhost:7240/api/Company/cnpj-is-in-db", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyCnpj: cnpj }),
        });
        const cnpjIsUsed = await response.json();
        return !cnpjIsUsed;
    } catch (error) {
        console.error("Erro ao verificar CNPJ:", error);
        return false;
    } finally {
        setButtonsIsLoading((prev: any) => ({ ...prev, checkingCnpj: false }));
    }
};

export const checkIfEmailIsInUse = async (email: string, setButtonsIsLoading: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        setButtonsIsLoading((prev: any) => ({ ...prev, checkingEmail: true }));
        const response = await fetch("https://localhost:7240/api/Company/email-is-in-db", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const emailIsUsed = await response.json();
        return !emailIsUsed;
    } catch (error) {
        console.error("Erro ao verificar Email:", error);
        return false;
    } finally {
        setButtonsIsLoading((prev: any) => ({ ...prev, checkingEmail: false }));
    }
};
