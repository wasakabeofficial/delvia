import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import bwipjs from "bwip-js";
import "../../styles/layout/Buy.css";
import { PRODUCTOS } from "../../constants/buy";

export default function Buy() {
  const [step, setStep] = useState(1);
  const [productoId, setProductoId] = useState(PRODUCTOS[0].id);
  const [cantidad, setCantidad] = useState(1);
  const [tipoPago, setTipoPago] = useState<"tarjeta" | "oxxo" | "">("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Ticket OXXO
  const folio = "OX-" + Math.floor(Math.random() * 900000 + 100000);
  const barcode =
    "75" + Math.floor(Math.random() * 900000000000 + 100000000000);

  const producto = PRODUCTOS.find((p) => p.id === productoId);
  const total = producto ? producto.precio * cantidad : 0;

  const barcodeCanvasRef = useRef<HTMLCanvasElement>(null);

  function resetFormulario() {
    setProductoId(PRODUCTOS[0].id);
    setCantidad(1);
    setTipoPago("");
    setCardName("");
    setCardNumber("");
    setCardMonth("");
    setCardYear("");
    setCardCvv("");
    setErrors({
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
    });
    setStep(1);
  }

  function validarCampo(campo: string, valor: string) {
    let mensaje = "";

    if (campo === "cardName") {
      if (!valor.trim()) mensaje = "Ingresa el nombre del titular.";
      else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(valor))
        mensaje = "Solo se permiten letras y espacios.";
    }

    if (campo === "cardNumber" && !/^\d{16}$/.test(valor))
      mensaje = "Ingresa un número válido de 16 dígitos.";

    if (campo === "cardMonth") {
      if (!/^\d{2}$/.test(valor) || Number(valor) < 1 || Number(valor) > 12)
        mensaje = "Mes inválido (01–12).";
    }

    if (campo === "cardYear" && !/^\d{2}$/.test(valor))
      mensaje = "Año inválido.";

    if (campo === "cardCvv" && !/^\d{3}$/.test(valor))
      mensaje = "El CVV debe tener 3 dígitos.";

    setErrors((prev) => ({ ...prev, [campo]: mensaje }));
  }

  function validarTarjetaCompleta() {
    return (
      !errors.cardName &&
      !errors.cardNumber &&
      !errors.cardMonth &&
      !errors.cardYear &&
      !errors.cardCvv &&
      cardName.trim() &&
      /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(cardName) &&
      /^\d{16}$/.test(cardNumber) &&
      /^\d{2}$/.test(cardMonth) &&
      /^\d{2}$/.test(cardYear) &&
      /^\d{3}$/.test(cardCvv)
    );
  }

  // === Renderizar código de barras en canvas (se llama solo en paso OXXO) ===
  React.useEffect(() => {
    if (step === 3 && tipoPago === "oxxo" && barcodeCanvasRef.current) {
      bwipjs.toCanvas(barcodeCanvasRef.current, {
        bcid: "code128",
        text: barcode,
        scale: 3,
        height: 20,
        includetext: false,
        backgroundcolor: "#ffffff",
      });
    }
  }, [step, tipoPago, barcode]);

  // === Generar y descargar PDF con código de barras dinámico ===
  async function descargarPDF() {
    const doc = new jsPDF({ unit: "pt", format: "letter" });

    // Header OXXO PAY
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 33, 33);
    doc.text("OXXO PAY", 40, 40);

    // Monto
    doc.setFontSize(13);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text("Monto:", 40, 80);
    doc.setFont("helvetica", "bold");
    doc.text(`$${total} MXN`, 110, 80);

    // Fecha vencimiento
    const fecha = new Date(Date.now() + 48 * 60 * 60 * 1000);
    const fechaStr =
      fecha.toLocaleDateString("es-MX") +
      " " +
      fecha.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

    doc.setFont("helvetica", "normal");
    doc.text("Vencimiento:", 40, 105);
    doc.setFont("helvetica", "bold");
    doc.text(fechaStr, 140, 105);

    // Referencia
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text("Díctale al cajero el siguiente número de referencia:", 40, 140);

    const refGroup = barcode.replace(/(.{4})/g, "$1 ").trim();
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(28, 34, 43);
    doc.text(refGroup, 40, 165);

    // Código de barras del canvas (como imagen base64)
    if (barcodeCanvasRef.current) {
      const imgData = barcodeCanvasRef.current.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 40, 190, 350, 80);
    }

    doc.save(`oxxo-ticket-${folio}.pdf`);

    setShowModal(false);
    resetFormulario();
  }

  function cerrarModalTarjeta() {
    setShowModal(false);
    resetFormulario();
  }

  // RENDER
  return (
    <main className="buy-main">
      <section className="buy-section">
        <h1 className="buy-title">Comprar Mermeladas</h1>

        {/* PASO 1 */}
        {step === 1 && (
          <div className="step-container">
            <h2 className="buy-subtitle">1. Selecciona tu producto</h2>
            <label className="buy-label">
              Selecciona tu mermelada:
              <select
                value={productoId}
                onChange={(e) => setProductoId(Number(e.target.value))}
                className="buy-select"
              >
                {PRODUCTOS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} — ${p.precio} MXN
                  </option>
                ))}
              </select>
            </label>

            <div
              className="buy-product-info"
              style={{ background: producto?.color }}
            >
              <strong>{producto?.nombre}</strong>
              <div className="buy-product-desc">{producto?.descripcion}</div>
            </div>

            <label className="buy-label">
              Cantidad:
              <input
                type="number"
                min={1}
                max={10}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="buy-input"
              />
            </label>

            <div className="buy-total">Total: ${total} MXN</div>
            <button className="buy-btn" onClick={() => setStep(2)}>
              Continuar
            </button>
          </div>
        )}

        {/* PASO 2 */}
        {step === 2 && (
          <div className="step-container">
            <h2 className="buy-subtitle">2. Elige tu método de pago</h2>
            <div className="pay-options">
              <label className="radio-box">
                <input
                  type="radio"
                  name="pago"
                  onChange={() => setTipoPago("tarjeta")}
                />
                Tarjeta de Crédito / Débito
              </label>
              <label className="radio-box">
                <input
                  type="radio"
                  name="pago"
                  onChange={() => setTipoPago("oxxo")}
                />
                Pago en OXXO
              </label>
            </div>
            {tipoPago !== "" && (
              <button className="buy-btn" onClick={() => setStep(3)}>
                Continuar
              </button>
            )}
            <button className="back-btn" onClick={() => setStep(1)}>
              Regresar
            </button>
          </div>
        )}

        {/* PASO 3 - TARJETA */}
        {step === 3 && tipoPago === "tarjeta" && (
          <div className="step-container">
            <h2 className="buy-subtitle">3. Ingresa los datos de tu tarjeta</h2>

            {/* Nombre titular */}
            <label className="buy-label">
              Nombre del titular:
              <input
                className={`buy-input-full ${errors.cardName ? "error-border" : ""}`}
                value={cardName}
                onChange={(e) => {
                  const val = e.target.value.replace(
                    /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g,
                    "",
                  );
                  setCardName(val);
                  validarCampo("cardName", val);
                }}
              />
              {errors.cardName && (
                <p className="input-error">{errors.cardName}</p>
              )}
            </label>

            {/* Número tarjeta */}
            <label className="buy-label">
              Número de tarjeta:
              <input
                className={`buy-input-full ${errors.cardNumber ? "error-border" : ""}`}
                maxLength={16}
                value={cardNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setCardNumber(val);
                  validarCampo("cardNumber", val);
                }}
              />
              {errors.cardNumber && (
                <p className="input-error">{errors.cardNumber}</p>
              )}
            </label>

            <div className="card-row">
              {/* Mes */}
              <label className="buy-label">
                MM:
                <input
                  maxLength={2}
                  className={`buy-input-small ${errors.cardMonth ? "error-border" : ""}`}
                  value={cardMonth}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setCardMonth(val);
                    validarCampo("cardMonth", val);
                  }}
                />
                {errors.cardMonth && (
                  <p className="input-error small">{errors.cardMonth}</p>
                )}
              </label>

              {/* Año */}
              <label className="buy-label">
                YY:
                <input
                  maxLength={2}
                  className={`buy-input-small ${errors.cardYear ? "error-border" : ""}`}
                  value={cardYear}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setCardYear(val);
                    validarCampo("cardYear", val);
                  }}
                />
                {errors.cardYear && (
                  <p className="input-error small">{errors.cardYear}</p>
                )}
              </label>

              {/* CVV */}
              <label className="buy-label">
                CVV:
                <input
                  maxLength={3}
                  className={`buy-input-small ${errors.cardCvv ? "error-border" : ""}`}
                  value={cardCvv}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setCardCvv(val);
                    validarCampo("cardCvv", val);
                  }}
                />
                {errors.cardCvv && (
                  <p className="input-error small">{errors.cardCvv}</p>
                )}
              </label>
            </div>

            <button
              className="buy-btn"
              disabled={!validarTarjetaCompleta()}
              onClick={() => setStep(4)}
            >
              Continuar
            </button>

            <button className="back-btn" onClick={() => setStep(2)}>
              Regresar
            </button>
          </div>
        )}

        {/* PASO 3 - OXXO */}
        {step === 3 && tipoPago === "oxxo" && (
          <div className="step-container">
            <h2 className="buy-subtitle">3. Ticket de pago OXXO</h2>
            <div className="oxxo-ticket">
              <h3>Folio: {folio}</h3>
              <p>Presenta este código en tu tienda OXXO:</p>
              <canvas
                ref={barcodeCanvasRef}
                style={{
                  background: "#fff",
                  margin: "8px auto",
                  display: "block",
                }}
                width={350}
                height={80}
              />
              <p className="oxxo-amount">Total a pagar: ${total} MXN</p>
              <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                Una vez pagado en OXXO, tu compra se reflejará en un máximo de
                24 horas.
              </p>
            </div>
            <button className="buy-btn" onClick={() => setShowModal(true)}>
              Confirmar
            </button>
            <button className="back-btn" onClick={() => setStep(2)}>
              Regresar
            </button>
          </div>
        )}

        {/* PASO 4 - TARJETA */}
        {step === 4 && tipoPago === "tarjeta" && (
          <div className="step-container">
            <h2 className="buy-subtitle">4. Confirmación final</h2>
            <p>
              <strong>Producto:</strong> {producto?.nombre}
            </p>
            <p>
              <strong>Cantidad:</strong> {cantidad}
            </p>
            <p>
              <strong>Total:</strong> ${total} MXN
            </p>
            <p>
              <strong>Tarjeta:</strong> **** **** **** {cardNumber.slice(-4)}
            </p>
            <button className="buy-btn" onClick={() => setShowModal(true)}>
              Comprar
            </button>
            <button className="back-btn" onClick={() => setStep(3)}>
              Regresar
            </button>
          </div>
        )}
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="modal-bg">
          <div className="modal-box">
            {tipoPago === "tarjeta" ? (
              <>
                <h2>Su compra ha sido exitosa</h2>
                <button className="buy-btn" onClick={cerrarModalTarjeta}>
                  Cerrar
                </button>
              </>
            ) : (
              <>
                <h2>Tu ticket OXXO está listo</h2>
                <button className="buy-btn" onClick={descargarPDF}>
                  Descargar PDF
                </button>
                <button
                  className="back-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
