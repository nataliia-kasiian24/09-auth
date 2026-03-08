'use client';

import { useEffect, useSyncExternalStore, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRouter } from 'next/navigation';
import css from "./Modal.module.css";

interface ModalProps {
children: ReactNode;
onClose?: () => void;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const Modal = ({ children, onClose }: ModalProps) => {
const router = useRouter();
const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

const handleClose = useCallback(() => {
if (onClose) {
onClose();
} else {
router.back();
}
}, [onClose, router]);

useEffect(() => {
if (!isMounted) return;

}, [isMounted, handleClose]);

if (!isMounted) return null;

const modalRoot = document.getElementById('modal-root');
if (!modalRoot) return null;

return createPortal(
<div className={css.backdrop} onClick={(e) => e.target === e.currentTarget && handleClose()}>
<div className={css.modal}>
{children}
</div>
</div>,
modalRoot
);
};