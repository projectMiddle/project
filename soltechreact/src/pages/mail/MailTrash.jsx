import React from "react";
import { useMail } from "../../contexts/MailContext";

const MailTrash = () => {
  const { mails, setMails } = useMail();

  const trashMails = mails.filter((mail) => mail.boxType === "trash");

  const handleDelete = (id) => {
    const updated = mails.filter((m) => m.id !== id);
    setMails(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🗑 휴지통</h2>
      {trashMails.length === 0 ? (
        <p className="text-gray-400">휴지통에 메일이 없습니다.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-2 w-10">#</th>
              <th className="p-2">보낸 사람</th>
              <th className="p-2">제목</th>
              <th className="p-2 text-right">삭제</th>
            </tr>
          </thead>
          <tbody>
            {trashMails.map((mail, index) => (
              <tr key={mail.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{mail.from}</td>
                <td className="p-2">{mail.title}</td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => handleDelete(mail.id)}
                    className="px-2 py-1 text-sm bg-red-100 hover:bg-red-200 rounded"
                  >
                    완전 삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MailTrash;
