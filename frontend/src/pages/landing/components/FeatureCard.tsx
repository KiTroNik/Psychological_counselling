import React from "react";

interface IProps {
  Image: React.FC<{clsName: string}>;
  title: string;
  content: string;
}

const FeatureCard = (props: IProps) => {
  const { Image, title, content } = props;

  return (
    <article className="py-20 w-full max-w-sm text-center rounded-lg shadow-2xl h-96">
      <Image clsName={"h-24 w-24 stroke-indigo-600 stroke-1 m-auto mb-4"} />
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-sm text-gray-600 w-40 m-auto">{content}</p>
    </article>
  )
}

export default FeatureCard;
