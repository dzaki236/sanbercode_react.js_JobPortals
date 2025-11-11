
import { AiOutlineDelete, AiOutlineEdit, AiOutlineReload, AiOutlineSave } from "react-icons/ai";
import ApiQuery from "../hooks/ApiQuery";
import { getStudentsScoreList, instanceApi } from "../hooks/ApiLogic";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { Button, Label, TextInput, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import FormHooks from "../hooks/FormHooks";
export default function Materi() {
    const { data: studentsData, isLoading } = ApiQuery('students_score', getStudentsScoreList);
    const [openModal, setOpenModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { value, handleInput, resetInput } = FormHooks({
        name: "",
        course: "",
        score: "",
    });

    const deleteHandler = async () => {
        if (!selectedStudent) return;
        setIsDeleting(true);
        try {

            const response = await instanceApi.delete(`student-scores/${selectedStudent.id}`);
            if (response.status !== 200) throw new Error("Failed to delete student");
            alert("Berhasil menghapus data!");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Gagal menghapus data!");
            window.location.reload();
        } finally {
            setIsDeleting(false);
            setOpenModal(false);
            window.location.reload();
        }
    }
    const formHandler = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const response = await instanceApi.put(`student-scores/${selectedStudent.id}`, {
                    name: value.name,
                    course: value.course,
                    score: value.score,
                });
                if (response.status !== 200) throw new Error("Failed to update student");
                alert("Data berhasil diupdate!");
            } else {
                const response = await instanceApi.post("student-scores", {
                    name: value.name,
                    course: value.course,
                    score: value.score,
                });
                if (response.status !== 201 && response.status !== 200) throw new Error("Gagal!");
                alert("Data berhasil disimpan!");
            }
            resetInput({});
            setIsEditing(false);
            setSelectedStudent(null);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan!");
        }
    }
    return (
        <>
            <div className="container p-4 mx-auto">
                <h1 className="text-2xl font-bold">Ini halaman materi!</h1>
                <br />
                <form onSubmit={formHandler}>
                    <div className="mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                        </div>
                        <TextInput id="nama_lengkap" name="name" value={value.name} onChange={handleInput} placeholder="Masukkan nama lengkap siswa" type="text" sizing="md" className="w-full bg-white" required />
                    </div>
                    <div className="mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="course">Course / Kursus</Label>
                        </div>
                        <TextInput id="course" name="course"
                            value={value.course} onChange={handleInput} placeholder="Masukkan nama kursus yg diikuti siswa" type="text" sizing="md" className="w-full bg-white" required />
                    </div>
                    <div className="mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="nilai">Nilai</Label>
                        </div>
                        <TextInput id="nilai" placeholder="Masukkan nilai siswa" type="number" sizing="md" className="w-full bg-white" name="score" value={value.score} onChange={handleInput} required />
                    </div>
                    <div className="mb-4">
                        <div className="flex">

                            <Button type="submit" color="dark"><AiOutlineSave className="mr-2 h-5 w-5" />       {isEditing ? "Update" : "Simpan"}
                            </Button>
                            {isEditing ? <Button className="ml-4" onClick={() => window.location.reload()} color="alternative"><AiOutlineReload className="mr-2 h-5 w-5" />       Refresh
                            </Button> : ""}
                        </div>
                    </div>
                </form >
                <br />
                <div className="overflow-x-auto">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>#</TableHeadCell>
                                <TableHeadCell>Nama</TableHeadCell>
                                <TableHeadCell>Course</TableHeadCell>
                                <TableHeadCell>Score</TableHeadCell>
                                <TableHeadCell>
                                    <span>Aksi</span>
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {isLoading ? <>
                                <span className="bg-blue-200 text-xs font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute -translate-y-1/2 -translate-x-1/2 top-2/4 left-1/2">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </span>
                            </> : studentsData.length === 0 ?
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell colSpan={5} className="text-center whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Data kosong
                                    </TableCell>
                                </TableRow> : studentsData.map((data, index) => <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.course}</TableCell>
                                    <TableCell>{data.score}</TableCell>
                                    <TableCell>
                                        <div className="flex">
                                            <Button
                                                color="yellow"
                                                size="xs"
                                                className="m-1"
                                                onClick={() => {
                                                    setSelectedStudent(data);
                                                    setIsEditing(true);
                                                    resetInput({
                                                        name: data.name,
                                                        course: data.course,
                                                        score: data.score,
                                                    });
                                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                                }}
                                            >
                                                <AiOutlineEdit className="h-5 w-5" />
                                            </Button>
                                            <Button onClick={() => {
                                                setSelectedStudent(data);
                                                setOpenModal(true);
                                            }} color="red" size="xs" className="m-1"><AiOutlineDelete className="h-5 w-5" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </div>
            </div >
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <ModalHeader>
                    Konfirmasi Hapus
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-2">
                        <p>Apakah kamu yakin ingin menghapus data siswa <strong>{selectedStudent?.name}</strong>?</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="red" onClick={deleteHandler} disabled={isDeleting}>
                        {isDeleting ? "Menghapus..." : "Hapus"}
                    </Button>
                    <Button color="alternative" onClick={() => setOpenModal(false)}>
                        Batal
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
