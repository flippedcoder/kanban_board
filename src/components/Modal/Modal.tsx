import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Input,
  Select,
} from '@headlessui/react';
import type { List, Ticket } from '../../pages/Board/Board.Container';

type ModalProps = {
  isOpen: boolean;
  toggleOpen: () => void;
  currentLists: List[];
  setNewTicket: (ticket: Ticket) => void;
};
const Modal = (props: ModalProps) => {
  const { isOpen, toggleOpen, currentLists, setNewTicket } = props;

  // Normally I'd use some form library like react-hook-forms, but using states for time
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [list, setList] = useState<string>('');

  const submitTicket = () => {
    setNewTicket({
      id: `${list}-${title}`,
      title,
      description,
      status,
      list,
    });

    toggleOpen();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggleOpen}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-gray-50 px-4 py-3 sm:flex flex-col sm:px-6">
              <div className="flex">
                <label>Title</label>
                <Input
                  className="border"
                  type="text"
                  value={title}
                  onChange={(value) => setTitle(value.currentTarget.value)}
                />
              </div>
              <div className="flex">
                <label>Description</label>
                <Input
                  className="border"
                  type="text"
                  value={description}
                  onChange={(value) =>
                    setDescription(value.currentTarget.value)
                  }
                />
              </div>
              <div className="flex">
                <label>Status</label>
                {/* Would refactor this to be a dropdown with options */}
                <Input
                  className="border"
                  type="text"
                  value={status}
                  onChange={(value) => setStatus(value.currentTarget.value)}
                />
              </div>
              <div className="flex">
                <label>List</label>
                <Select
                  onChange={(value) => setList(value.currentTarget.value)}
                >
                  {currentLists.map((list) => (
                    <option
                      key={list.id}
                      value={list.id}
                    >
                      {list.name}
                    </option>
                  ))}
                </Select>
              </div>
              <button
                onClick={submitTicket}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-grey-900 shadow-xs ring-1 ring-green-600 ring-inset hover:bg-green-500 sm:mt-0 sm:w-auto"
              >
                Create ticket
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => toggleOpen()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
