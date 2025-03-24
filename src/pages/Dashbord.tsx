import MyStore from "../components/dashboard/store/MyStore";
import Sidebar from "../components/ui/SideBar";
import useCompanyStore from "../store/CompanyReducer";


export default function Dashboard() {
    const { name } = useCompanyStore();
    return (
        <div>
            <div className="border-b border-slate-200 flex flex-row">
                <div>
                    <Sidebar />
                </div>
                <div
                    className="
                    flex flex-row
                    m-auto mx-auto
                    ">
                    <h1>Olá, {name}!</h1>
                </div>
            </div>
            <MyStore />
        </div>
    );
}