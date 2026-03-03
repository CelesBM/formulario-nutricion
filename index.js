const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const datos = new FormData(formulario);

  // ⚠️ Manejo especial para checkboxes (comidas del día)
  const comidasSeleccionadas = datos.getAll("comidasDia");

  const objetoDatos = Object.fromEntries(datos.entries());
  objetoDatos.comidasDia = comidasSeleccionadas.join(", ");

  let y = 10;

  doc.setFontSize(14);
  doc.text("Formulario Nutricional", 10, y);
  y += 10;

  doc.setFontSize(10);

  for (const key in objetoDatos) {
    const texto = `${key}: ${objetoDatos[key]}`;
    doc.text(texto, 10, y);
    y += 7;

    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  }

  // 🟠 Nombre del paciente para el archivo
  let nombrePaciente = objetoDatos.nombre || "Paciente";

  nombrePaciente = nombrePaciente
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");

  const nombreArchivo = `Formulario_${nombrePaciente}.pdf`;

  doc.save(nombreArchivo);

  // 📲 FORMATEAMOS MENSAJE PARA WHATSAPP
  const mensaje = `
FORMULARIO NUTRICIONAL

👤 Nombre: ${objetoDatos.nombre}
📅 Fecha de nacimiento: ${objetoDatos.fechaNacimiento}

⚖️ Peso: ${objetoDatos.peso} kg
📏 Estatura: ${objetoDatos.estatura} m
🎯 Peso habitual: ${objetoDatos.pesoHabitual} kg

🍽️ Comidas que realiza: ${objetoDatos.comidasDia}

📝 Descripción alimentación:
${objetoDatos.comidas}

💧 Ingesta de líquidos:
${objetoDatos.bebidas}

🏋️ Actividad física:
${objetoDatos.actividad}
`;

  const numero = "5491155031316";
  const mensajeCodificado = encodeURIComponent(mensaje);

  window.open(`https://wa.me/${numero}?text=${mensajeCodificado}`, "_blank");
});
