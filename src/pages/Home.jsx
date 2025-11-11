import { Card, Label, TextInput } from "flowbite-react";
import ApiQuery from "../hooks/ApiQuery";
import { getJobList } from "../hooks/ApiLogic";
import { Badge } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import FormHooks from "../hooks/FormHooks";

function Home() {
    const { data: jobData = [], isLoading } = ApiQuery('jobs', getJobList);
    const { value, handleInput } = FormHooks({ search: "" });
    const filteredData = (jobData || []).filter((job) => {
        const term = value.search.toLowerCase();
        return (
            job.title.toLowerCase().includes(term) ||
            job.company_name.toLowerCase().includes(term) ||
            job.company_city.toLowerCase().includes(term)
        );
    });
    return (
        <>
            <div className="container p-4 mx-auto">
                <h1 className="text-2xl font-bold">Ini halaman home!</h1>
                <br />
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="email4">Your email</Label>
                    </div>
                    <TextInput name="search" onChange={handleInput} value={value.search} icon={AiOutlineSearch} placeholder="Cari pekerjaan impianmu disini" />
                </div>
                <br />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(!filteredData || filteredData.length === 0)??<div>No jobs found</div>}
                    {isLoading ? <>
                        <span className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute -translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2">
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </span>
                    </> : filteredData.length===0?<h1>Ups sepertinya tidak ada yang cocok! <br/> Coba cari kata kunci lain yaa</h1>:filteredData.map((data, index) =>
                        <div key={data.id || index} className="w-full max-w p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{data.title} ({data.job_tenure}) | {data.job_type}</h5>
                                {data.job_status ? <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    View here
                                </a> : <Badge color="failure">Lowongan ditutup!</Badge>
                                }
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="shrink-0">
                                                <img className="w-8 h-8 rounded-full" src={data.company_image_url} alt="Neil image" />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {data.company_name}, ({data.company_city})
                                                </p>
                                                <p className="text-sm text-gray-500 mb-4 truncate dark:text-gray-400">
                                                    {data.job_description}
                                                </p>
                                                <hr />
                                                <p className="text-sm text-gray-500 font-bold mt-4 truncate dark:text-gray-400">
                                                    {data.job_qualification}
                                                </p>
                                            </div>
                                        </div>
                                            <div className="inline-flex mt-4 items-center text-base font-semibold text-gray-900 dark:text-white">
                                                RP, {data.salary_min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} - RP, {data.salary_max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Home;
