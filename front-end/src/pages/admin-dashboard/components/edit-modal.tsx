import { Button, FormControl, Input, Modal } from "native-base";
import { useEffect, useState } from "react";
import { Bank } from "../../../repository";
import { scroll } from "../../../utils";

export function EditModal({
  modalVisible,
  setModalVisible,
  setApproval,
  data,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  setApproval: Function;
  data: Bank;
}) {
  const [bankDetails, setbankDetails] = useState({
    name: data.name,
    email: data.email,
    id: data.id_,
  });

  useEffect(() => {
    modalVisible && scroll();
  }, [modalVisible]);

  return (
    <Modal
      h="100vh"
      isOpen={modalVisible}
      onClose={setModalVisible}
      size={"md"}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Update Bank Information</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              value={bankDetails.name}
              onChangeText={(text) =>
                setbankDetails((curr) => ({ ...curr, name: text }))
              }
              placeholder="Enter reason"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              value={bankDetails.email}
              onChangeText={(text) =>
                setbankDetails((curr) => ({ ...curr, email: text }))
              }
              placeholder="Enter reason"
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModalVisible(false);
              }}
            >
              cancel
            </Button>
            <Button
              bg={"danger.600"}
              onPress={() => {
                setApproval(bankDetails);
              }}
            >
              ok
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
