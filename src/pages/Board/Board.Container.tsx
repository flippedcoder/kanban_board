import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import Ticket from '../../components/Ticket/Ticket';

export type Ticket = {
  id: string; // imagine a uuid or something
  title: string;
  description: string;
  status: string;
  list: string;
  order: number;
};
export type List = {
  name: string;
  id: string;
};

const listsData: List[] = [
  {
    name: 'Backlog',
    id: 'backlog',
  },
  {
    name: 'List 1',
    id: 'list_1',
  },
  {
    name: 'List 2',
    id: 'list_2',
  },
];

const ticketData: Ticket[] = [
  {
    title: 'Task 1',
    description: 'Do something cool',
    status: 'incomplete',
    list: 'backlog',
    id: 'wtetw',
    order: 0,
  },
  {
    title: 'Task 2',
    description: 'Do something cool',
    status: 'incomplete',
    list: 'list_1',
    id: 'etgweq',
    order: 0,
  },
  {
    title: 'Task 3',
    description: 'Do something cool',
    status: 'incomplete',
    list: 'list_2',
    id: 'y2h35h',
    order: 0,
  },
  {
    title: 'Task 4',
    description: 'Do something cool',
    status: 'incomplete',
    list: 'backlog',
    id: '6kee5n5',
    order: 1,
  },
];

const Board = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(ticketData);
  // Would use this state to add or remove lists
  const [lists, setLists] = useState<List[]>(listsData);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onCreateNewTicket = () => {
    setIsModalOpen(true);
  };

  const addNewTicket = (newTicket: Ticket) => {
    console.log('newTicket', newTicket);
    setTickets([...tickets, newTicket]);
  };

  const removeTicket = (id: string) => {
    const filteredTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets([...filteredTickets]);
  };

  const changeList = (props: { ticketId: string; listId: string }) => {
    const { ticketId, listId } = props;

    const ticket = tickets.find((ticket) => ticket.id === ticketId)!;
    const updatedTicket = {
      ...ticket,
      list: listId,
    };

    const refreshTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets([...refreshTickets, updatedTicket]);
  };

  const moveTicket = ({
    ticketId,
    direction,
  }: {
    ticketId: string;
    direction: 'up' | 'down';
  }) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    const listTickets = tickets
      .filter((t) => t.list === ticket.list)
      .sort((a, b) => a.order - b.order);

    const currentIndex = listTickets.findIndex(
      (listTicket) => listTicket.id === ticketId
    );
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= listTickets.length) return;

    // Swap orders
    const otherTicket = listTickets[newIndex];

    const updatedTickets = tickets.map((newTicket) => {
      if (newTicket.id === ticket.id)
        return { ...newTicket, order: otherTicket.order };

      if (newTicket.id === otherTicket.id)
        return { ...newTicket, order: ticket.order };

      return newTicket;
    });

    setTickets(updatedTickets);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <button onClick={onCreateNewTicket}>Create new ticket</button>
      <div className="flex justify-center gap-3 w-full">
        {lists.map((list) => {
          const ticketsInList = tickets
            .filter((ticket) => ticket.list === list.id)
            .sort((a, b) => a.order - b.order);
          return (
            <div
              key={list.id}
              className="flex flex-col gap-3"
            >
              <div>{list.name}</div>
              {ticketsInList.map((ticketInList) => {
                return (
                  <Ticket
                    id={ticketInList.id}
                    key={ticketInList.id}
                    description={ticketInList.description}
                    status={ticketInList.status}
                    list={ticketInList.list}
                    title={ticketInList.title}
                    currentLists={lists}
                    moveTicket={moveTicket}
                    changeList={changeList}
                    removeTicket={removeTicket}
                  />
                );
              })}
            </div>
          );
        })}
        <Modal
          isOpen={isModalOpen}
          toggleOpen={toggleModal}
          currentLists={lists}
          setNewTicket={addNewTicket}
        />
      </div>
    </div>
  );
};

export default Board;
