import "./tailwind.css";

export const Footer = () => {
  return (
    <>
      <footer className="text-center bg-blue-100 py-2">
        <div className="container mx-auto">
          <p className="text-gray-600 text-sm mb-2">&copy; 2024</p>
          <p className="text-gray-600 text-sm mb-2">
            Contact us at{" "}
            <a
              href="mailto:2289960268@qq.com"
              className="text-blue-500 hover:underline"
            >
              2289960268@qq.com
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};
