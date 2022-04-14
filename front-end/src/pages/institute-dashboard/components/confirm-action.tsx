import {
  Button,
  FormControl,
  Modal,
  Spinner,
  Text,
  TextArea,
} from "native-base";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { scroll } from "../../../utils";

export function ConfirmAction({
  modalVisible,
  setModalVisible,
  operation,
  id,
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: Function;
  modalVisible: boolean;
  setModalVisible: Function;
  operation: "accept" | "reject" | "reapply";
  id: string;
}) {
  const [notes, setNotes] = useState<string>("");
  const { updateKycVerification, reRequestForKycRequest } = useApi();

  useEffect(() => {
    modalVisible && scroll();
  }, [modalVisible]);

  async function handleKYCAction() {
    try {
      setLoading(true);
      if (operation === "reapply") {
        await reRequestForKycRequest(id, notes);
      } else {
        await updateKycVerification({
          id,
          isVerified: operation === "accept" ? true : false,
          notes,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setModalVisible(false);
      setLoading(false);
    }
  }
  return (
    <Modal
      isOpen={modalVisible}
      onClose={() => setModalVisible(false)}
      size={"md"}
      h="100vh"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontWeight={"bold"}>
            Complete Customer KYC{" "}
            {operation === "reject"
              ? "Rejection"
              : operation === "reapply"
              ? "Re Apply"
              : "Verification"}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <FormControl isInvalid={notes.length === 0}>
            <FormControl.Label>Enter Notes</FormControl.Label>
            <TextArea
              placeholder="Enter reason"
              value={notes}
              onChangeText={setNotes}
            />
            <FormControl.ErrorMessage>
              {"This field cannot be empty"}
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => setModalVisible(false)}
            >
              cancel
            </Button>
            <Button
              bg={"danger.600"}
              onPress={() => notes.length !== 0 && handleKYCAction()}
              isDisabled={loading}
            >
              {loading ? <Spinner color="white" size={"sm"} /> : "ok"}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
