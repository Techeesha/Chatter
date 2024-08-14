export const useReadTime = () => {
  const averageReadingSpeed = 200; // words per minute

  const calculateReadingTime = (text: string): string => {
    // Remove leading and trailing white spaces
    const trimmedText = text?.trim();

    // Split the text into an array of words using white spaces as the separator
    const words = trimmedText?.split(/\s+/);
    const minutes = Math.ceil((words?.length || 0) / averageReadingSpeed);
    return words.length < 50 ? "less than a min read" : `${minutes} min read`;
  };

  return { calculateReadingTime };
};
