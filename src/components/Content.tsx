import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import React from "react";

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  return (
    <div className="m-2 p-2">
      <ul className="m-2 bg-purple-300 p-2">
        {topics?.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Topic"
        className="bg-red-300"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTopic.mutate({ title: e.currentTarget.value });
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default Content;
