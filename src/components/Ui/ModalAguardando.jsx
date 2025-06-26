import React from "react";

const ModalAguardando = ({ loadingEnd = false, children }) => {
    if (loadingEnd) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.spinner}></div>
                <p style={{color: "#000"}}>Aguarde enquanto a Analise é Gerada</p>
                {children}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        background: "#fff",
        padding: 32,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    spinner: {
        width: 48,
        height: 48,
        border: "6px solid #eee",
        borderTop: "6px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: 16,
    },
};

// Adicione a animação globalmente
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}`;
document.head.appendChild(styleSheet);

export default ModalAguardando;