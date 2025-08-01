import {Modal} from "../Modal/Modal";
import {Dispatch, SetStateAction} from "react";
import {deleteTask} from "../../api/task.api";
import {useNavigate} from "react-router-dom";
interface ConfirmDeleteModalProps {
    id?: string;
    onClose?: Dispatch<SetStateAction<boolean>>
}
export function ConfirmDeleteModal({id, onClose}: ConfirmDeleteModalProps) {
    const navigate = useNavigate();
    async function handleSubmit() {
        if (id){
            const res: any = await deleteTask(id)
            if(res){
                navigate('/dashboard')

            }
        }else{
            alert('no task selected')
        }



    }
    function handleCancel() {
        onClose?.(false)
    }
    return (
        <Modal
            centered
            open={true}
            size="small"
            destroyOnClose={true}
            onCancel={handleCancel}
            onOk={handleSubmit}
            okText="Confirm"

        >
            <span>Are you sure you want to delete this task ?</span>
        </Modal>
    )
}