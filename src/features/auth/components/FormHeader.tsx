interface FormHeaderProps {
  title: string;
  description: string;
  slug?: string;
}

function FormHeader({ title, description, slug }: FormHeaderProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-app-secondary text-4xl font-noto-serif-georgian font-normal">
        {title}
      </h1>
      <div className="space-y-1 text-center">
        <p className="text-xs font-montserrat font-normal text-app-neutral-darker text-center">
          {description}
        </p>

        {slug && (
          <p className="text-app-info text-xs font-montserrat font-normal ">
            {slug}
          </p>
        )}
      </div>
    </div>
  );
}

export default FormHeader;
