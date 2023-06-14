import React, { useRef, useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  useGetSectionQuery,
  useUpdateSectionMutation
} from '@/entities/section/api-slices';

type Props = {
  sectionId: string,
  onHide: () => void;
};

const SectionModal = (props: Props) => {
  const { sectionId, onHide } = props;

  const titleRef = useRef(null);
  const [formData, setFormData] = useState(null);

  const [updateSection] = useUpdateSectionMutation();

  const { data: sectionData } = useGetSectionQuery(sectionId, {
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    setFormData(sectionData);
  }, [sectionData]);

  const onSave = () => {
    updateSection({
      id: sectionId,
      title: titleRef.current.value,
    });
    onHide();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return ReactDOM.createPortal(
    <Modal show onHide={onHide}>

      <Modal.Header closeButton>
        <Modal.Title>
          <b>Edit section</b>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>

            <Form.Control
              ref={titleRef}
              type="text"
              defaultValue={formData?.title}
              disabled={formData === null}
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
  );
}

export default SectionModal;