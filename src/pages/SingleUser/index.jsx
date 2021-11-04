import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { firestore } from "../../firebase/config";

const SingleUser = () => {
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState(null);

  const { orderList } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    if (userId) {
      firestore
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          setUser({ ...doc.data(), id: doc.id });
        });
    }
  }, [userId]);

  const renderOrder = () => {
    const userOrderList = orderList?.filter((el) => el.uid === userId);
    console.log(userOrderList);
    return (
      <div className="md:col-span-6 text-sm bg-white p-5 rounded shadow-sm">
        {userOrderList.length > 0
          ? userOrderList.map((item, i) => {
              return (
                <div
                  key={i}
                  className="p-5 flex flex-row justify-between items-center"
                >
                  <div>
                    <p class="w-44 whitespace-nowrap mb-1 overflow-hidden overflow-ellipsis">
                      {item.title}
                    </p>
                    <img className="w-16" src={item.photo} alt={`order${i}`} />
                  </div>
                  <div>
                    {item.price} * {item.quantity}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    );
  };

  const renderUser = () => {
    const { email } = user;
    return (
      <div className="md:grid grid-cols-12 gap-15">
        <div className="md:col-span-4">
          <p>Email:{email}</p>
        </div>
        {renderOrder()}
      </div>
    );
  };

  return user ? renderUser() : "";
};

export default SingleUser;
