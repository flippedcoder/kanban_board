import { Select } from '@headlessui/react';
import type { List } from '../../pages/Board/Board.Container';

type TicketProps = {
  id: string;
  title: string;
  list: string;
  description: string;
  status: string;
  currentLists: List[];
  moveTicket: ({
    ticketId,
    direction,
  }: {
    ticketId: string;
    direction: 'up' | 'down';
  }) => void;
  changeList: ({
    ticketId,
    listId,
  }: {
    ticketId: string;
    listId: string;
  }) => void;
  removeTicket: (id: string) => void;
};

const Ticket = (props: TicketProps) => {
  const {
    id,
    title,
    currentLists,
    description,
    status,
    list,
    moveTicket,
    changeList,
    removeTicket,
  } = props;

  return (
    <div
      key={id}
      className="flex flex-col gap-4 border p-2"
    >
      <div>{title}</div>
      <div>{description}</div>
      <div>{status}</div>
      <button onClick={() => moveTicket({ ticketId: id, direction: 'up' })}>
        ↑
      </button>
      <button onClick={() => moveTicket({ ticketId: id, direction: 'down' })}>
        ↓
      </button>
      <div className="border flex flex-col p-4">
        <label>Change List</label>
        <Select
          value={list}
          onChange={(e) => changeList({ ticketId: id, listId: e.target.value })}
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
      <button onClick={() => removeTicket(id)}>Remove</button>
    </div>
  );
};

export default Ticket;
