import { Button, FormControl, Modal, Text, TextArea } from "native-base";
import { useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { KycRequest } from "../../../repository";
import { toastError } from "../../../utils";

export function ConfirmAction({
  modalVisible,
  setModalVisible,
  heading,
  kycAction,
  setApproval,
  message,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  heading: string;
  kycAction: Function;
  setApproval?: Function;
  message: Function;
}) {
  const [notes, setNotes] = useState<string>("");

  const reset = () => {
    setModalVisible(false);
    if (setApproval) {
      setApproval(undefined);
    }
    setNotes("");
  };

  const handleOnClick = () => {
    if (notes.length === 0) {
      toastError("Notes cannot be empty");
    } else {
      kycAction(notes);
    }
  };

  return (
    <Modal isOpen={modalVisible} onClose={reset} size={"md"}>
      <Modal.Content maxH="350">
        <Modal.CloseButton />
        <Modal.Header>{heading}</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>{message()}</FormControl.Label>
          </FormControl>
          <TextArea
            placeholder="Enter reason"
            value={notes}
            onChangeText={setNotes}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                reset();
              }}>
              cancel
            </Button>
            <Button
              bgColor="blueGray.800"
              _hover={{ bgColor: "blueGray.600" }}
              onPress={() => {
                handleOnClick();
                reset();
              }}>
              ok
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
