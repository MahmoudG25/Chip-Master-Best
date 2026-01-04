import Navbar from "../components/NavBar";

const Order = () => {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Place an Order</h1>
          <p className="text-gray-600">Order your products here.</p>
        </div>
      </>
    );
};

export default Order;
