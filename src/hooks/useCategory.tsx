import { useEffect, useState } from "react";

export const useCategory = (): {
  category: (postContent: string) => Promise<string[] | undefined>;
  error: any;
  isPending: boolean;
} => {
  const [error, setError] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const category = async (
    postContent: string
  ): Promise<string[] | undefined> => {
    setIsPending(true);

    const formdata = new FormData();
    formdata.append("key", "603d4cd6e7612cba7091153d8a863691");
    formdata.append("txt", postContent);
    formdata.append("model", "IPTC_en");

    const requestOptions: RequestInit = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.meaningcloud.com/class-2.0",
        requestOptions
      );

      const data = await response.json();
      console.log(data);

      if (data) {
        return data.category_list[0].label.split(/-|,/);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { category, error, isPending };
};
