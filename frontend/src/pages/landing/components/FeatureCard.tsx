import React from "react";

interface IProps {
  Image: React.FC<{ clsName: string }>;
  title: string;
  content: string;
}

const FeatureCard = (props: IProps) => {
  const { Image, title, content } = props;

  return (
    <article className="h-96 w-full max-w-sm rounded-lg py-20 text-center shadow-2xl">
      <Image clsName={"h-24 w-24 stroke-indigo-600 stroke-1 m-auto mb-4"} />
      <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="m-auto w-40 text-sm text-gray-600">{content}</p>
    </article>
  );
};

export default FeatureCard;
