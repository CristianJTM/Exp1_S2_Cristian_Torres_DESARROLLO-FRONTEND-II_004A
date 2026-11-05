import useContactForm from '../../hooks/useContactForm.js'
import { ASUNTOS, CONTACTO_SECCION, FORM_INICIAL } from '../../data/contacto.js'
import FormField from '../ui/FormField.jsx'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const { form, errores, enviado, nombreEnviado, handleChange, handleSubmit } =
    useContactForm(FORM_INICIAL)

  return (
    <div className={styles.formCard}>
      <h2>{CONTACTO_SECCION.formTitle}</h2>
      <p className={styles.formCardIntro}>
        {CONTACTO_SECCION.formIntroBefore}
        <span className="required">*</span>
        {CONTACTO_SECCION.formIntroAfter}
      </p>

      {enviado && (
        <div className={styles.formSuccess} role="status">
          <span aria-hidden="true">✅</span>
          <p>
            {CONTACTO_SECCION.formSuccessBefore}
            {nombreEnviado}
            {CONTACTO_SECCION.formSuccessAfter}
          </p>
        </div>
      )}

      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.formRow}>
          <FormField
            id="nombre"
            name="nombre"
            label="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            error={errores.nombre}
            required
            autoComplete="name"
            placeholder="Ej: Cristian Torres"
          />
          <FormField
            id="email"
            name="email"
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errores.email}
            required
            autoComplete="email"
            placeholder="nombre@correo.cl"
          />
        </div>

        <div className={styles.formRow}>
          <FormField
            id="telefono"
            name="telefono"
            label="Teléfono (opcional)"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
            error={errores.telefono}
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
          />
          <FormField
            as="select"
            id="asunto"
            name="asunto"
            label="Asunto"
            value={form.asunto}
            onChange={handleChange}
            required
            options={ASUNTOS}
          />
        </div>

        <FormField
          as="textarea"
          id="mensaje"
          name="mensaje"
          label="Mensaje"
          value={form.mensaje}
          onChange={handleChange}
          error={errores.mensaje}
          required
          rows={5}
          placeholder="Cuéntanos en qué podemos ayudarte..."
        />

        <button type="submit" className="btn btn--primary btn--full">
          Enviar mensaje
        </button>

        <p className={styles.formNote}>{CONTACTO_SECCION.formNote}</p>
      </form>
    </div>
  )
}
