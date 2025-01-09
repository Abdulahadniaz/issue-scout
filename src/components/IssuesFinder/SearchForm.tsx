import { SearchMethod } from "@/types/github";

interface SearchFormProps {
  selectedMethod: SearchMethod;
  onMethodChange: (method: SearchMethod) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  formError?: string;
  urlProps: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  ownerRepoProps: {
    owner: string;
    repo: string;
    onOwnerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRepoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export function SearchForm({
  selectedMethod,
  onMethodChange,
  onSubmit,
  isLoading,
  formError,
  urlProps,
  ownerRepoProps,
}: SearchFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-start gap-2 my-2">
        <MethodToggle
          method="url"
          selected={selectedMethod === "url"}
          onClick={() => onMethodChange("url")}
        />
        <MethodToggle
          method="ownerRepoName"
          selected={selectedMethod === "ownerRepoName"}
          onClick={() => onMethodChange("ownerRepoName")}
        />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {selectedMethod === "url" ? (
          <input
            type="text"
            value={urlProps.value}
            onChange={urlProps.onChange}
            placeholder="Enter GitHub repository URL"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={ownerRepoProps.owner}
              onChange={ownerRepoProps.onOwnerChange}
              placeholder="Enter repo owner"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              value={ownerRepoProps.repo}
              onChange={ownerRepoProps.onRepoChange}
              placeholder="Enter repo name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500"
          disabled={isLoading}
        >
          Find Issues
        </button>
      </form>

      {formError && <div className="text-red-500 mt-4">{formError}</div>}
    </div>
  );
}

function MethodToggle({
  method,
  selected,
  onClick,
}: {
  method: SearchMethod;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`cursor-pointer p-1 rounded-md ${
        selected ? "bg-gray-200 text-gray-500" : "bg-white-500 text-gray-500"
      }`}
      onClick={onClick}
    >
      {method === "url" ? "By URL" : "By Name"}
    </div>
  );
}
