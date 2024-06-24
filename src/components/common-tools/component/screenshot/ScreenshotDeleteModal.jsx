/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Monday, April 29th 2024, 9:45:20 pm
 * Author: Marissa Ana | bea.marissa07@gmail.com <https://github.com/MarissaAna>
 *
 */

import React from "react";
import { VscScreenFull } from "react-icons/vsc";

import MoveableDeleteModal from "../../common/components/MoveableDeleteModal";
import Button from "../../common/components/Button";
import DangerIcon from "../../common/components/DangerIcon";

const DeleteModal = ({ onCancel, show, onConfirm }) => {
  return (
    <MoveableDeleteModal
      data-testid="delete-modal"
      onClose={onCancel}
      show={show}
      icon={<VscScreenFull />}
      className="w-[380px]"
    >
      <div className="w-80 my-8 mx-12 text-white">
        <div className="flex gap-2 justify-center items-center font-bold">
          <DangerIcon />
          Delete Image?
        </div>
        <div className="text-center my-6 font-bold">
          <p>This image will be permanently deleted from this list</p>
        </div>
        <div className="flex justify-center gap-4 font-bold">
          <Button onClick={onCancel} className="bg-dark-secondary shadow-lg">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-dark-error hover:bg-dark-on-error shadow-lg"
            data-testid="delete"
          >
            Delete
          </Button>
        </div>
      </div>
    </MoveableDeleteModal>
  );
};

export default DeleteModal;
