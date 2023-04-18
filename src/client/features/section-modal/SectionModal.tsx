import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  useUpdateSectionMutation,
} from '@/entities/section/api-slices';

type Props = {
  data: {
    sectionId: string,
    sectionTitle: string
  } | null,
  isShowing: boolean,
  onHide: () => void;
};

const SectionModal = (
  { data, isShowing, onHide }: Props
) => {
  const titleRef = useRef(null);

  const [updateSection] = useUpdateSectionMutation();

  const onSave = () => {
    updateSection({
      id: data.sectionId,
      title: titleRef.current.value,
    });
  };

  return isShowing
    ? ReactDOM.createPortal(
      <Modal show={isShowing} onHide={onHide}>

        <Modal.Header closeButton>
          <Modal.Title><b>Edit section</b></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>

              <Form.Control
                ref={titleRef}
                type="text"
                defaultValue={data.sectionTitle}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={onSave}>
            Save changes
          </Button>

          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>, document.body
    )
    : null;
}

export default SectionModal;