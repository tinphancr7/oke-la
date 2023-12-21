import ProfileLayout from "@/layouts/ProfileLayout";
import React from "react";

const Reply = () => {
  return (
    <div className="col-span-7">
      <h5 className="text-lg font-bold text-black pb-6">Phản hồi</h5>
    </div>
  );
};
Reply.getLayout = (page: any) => <ProfileLayout>{page}</ProfileLayout>;
export default Reply;
