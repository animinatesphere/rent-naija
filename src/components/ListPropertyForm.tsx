"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Property", "Details", "Amenities", "Photos", "Review"];

const propertyTypes = ["Apartment", "Duplex", "Bungalow", "Self-Contain", "Mini Flat"];

const amenityOptions = [
  "24/7 Electricity",
  "Borehole Water",
  "Fitted Kitchen",
  "Gated Estate",
  "Parking Space",
  "CCTV",
  "Inverter System",
  "Private Garden",
  "BQ (Boys' Quarters)",
  "Prepaid Meter",
  "Security Guard",
  "Furnished",
];

type FormData = {
  propertyType: string;
  city: string;
  state: string;
  address: string;
  bedrooms: string;
  bathrooms: string;
  pricePerYear: string;
  description: string;
  amenities: string[];
  photos: string[];
};

const initialData: FormData = {
  propertyType: "",
  city: "",
  state: "",
  address: "",
  bedrooms: "",
  bathrooms: "",
  pricePerYear: "",
  description: "",
  amenities: [],
  photos: [],
};

export default function ListPropertyForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const isLastStep = step === steps.length - 1;

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleAmenity(amenity: string) {
    setData((d) => ({
      ...d,
      amenities: d.amenities.includes(amenity)
        ? d.amenities.filter((a) => a !== amenity)
        : [...d.amenities, amenity],
    }));
  }

  function handlePhotoSelect(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).map((f) => f.name);
    update("photos", [...data.photos, ...files].slice(0, 8));
  }

  function goNext() {
    if (isLastStep) {
      setSubmitted(true);
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  const canProceed = isStepValid(step, data);

  if (submitted) {
    return <SuccessState onReset={() => { setSubmitted(false); setStep(0); setData(initialData); }} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Stepper currentStep={step} />

      <div className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {step === 0 && <StepProperty data={data} update={update} />}
            {step === 1 && <StepDetails data={data} update={update} />}
            {step === 2 && (
              <StepAmenities selected={data.amenities} toggle={toggleAmenity} />
            )}
            {step === 3 && (
              <StepPhotos photos={data.photos} onSelect={handlePhotoSelect} />
            )}
            {step === 4 && <StepReview data={data} />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6">
          <motion.button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            whileHover={step !== 0 ? { scale: 1.02 } : undefined}
            whileTap={step !== 0 ? { scale: 0.98 } : undefined}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-foreground/60 transition hover:text-foreground disabled:opacity-0"
          >
            Back
          </motion.button>

          <motion.button
            type="button"
            onClick={goNext}
            disabled={!canProceed}
            whileHover={canProceed ? { scale: 1.02 } : undefined}
            whileTap={canProceed ? { scale: 0.98 } : undefined}
            className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-foreground/20 disabled:shadow-none"
          >
            {isLastStep ? "Submit Listing" : "Continue"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function isStepValid(step: number, data: FormData) {
  switch (step) {
    case 0:
      return Boolean(data.propertyType && data.city && data.state && data.address);
    case 1:
      return Boolean(data.bedrooms && data.bathrooms && data.pricePerYear && data.description);
    default:
      return true;
  }
}

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const completed = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: completed || active ? "var(--brand)" : "#fff",
                  borderColor: completed || active ? "var(--brand)" : "rgba(0,0,0,0.15)",
                  color: completed || active ? "#fff" : "rgba(0,0,0,0.4)",
                }}
                transition={{ duration: 0.25 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold"
              >
                {completed ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </motion.svg>
                ) : (
                  i + 1
                )}
              </motion.div>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  active ? "text-brand-dark" : "text-foreground/40"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="relative mx-2 h-0.5 flex-1 bg-black/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-brand"
                  initial={false}
                  animate={{ width: i < currentStep ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="text-sm font-medium text-foreground/80">{children}</label>;
}

const inputClass =
  "mt-1 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

function StepProperty({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Property Details</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Tell us what kind of property you&apos;re listing and where it is.
        </p>
      </div>

      <div>
        <FieldLabel>Property Type</FieldLabel>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {propertyTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update("propertyType", type)}
              className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                data.propertyType === type
                  ? "border-brand bg-brand-light text-brand-dark"
                  : "border-black/10 text-foreground/60 hover:border-black/20"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel>City</FieldLabel>
          <input
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="e.g. Lekki"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>State</FieldLabel>
          <input
            value={data.state}
            onChange={(e) => update("state", e.target.value)}
            placeholder="e.g. Lagos"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <FieldLabel>Full Address</FieldLabel>
        <input
          value={data.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Street, area, landmark"
          className={inputClass}
        />
      </div>
    </div>
  );
}

function StepDetails({
  data,
  update,
}: {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Details & Pricing</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Help renters know what to expect before they reach out.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <FieldLabel>Bedrooms</FieldLabel>
          <input
            type="number"
            min="0"
            value={data.bedrooms}
            onChange={(e) => update("bedrooms", e.target.value)}
            placeholder="3"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Bathrooms</FieldLabel>
          <input
            type="number"
            min="0"
            value={data.bathrooms}
            onChange={(e) => update("bathrooms", e.target.value)}
            placeholder="2"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Price / Year (₦)</FieldLabel>
          <input
            type="number"
            min="0"
            value={data.pricePerYear}
            onChange={(e) => update("pricePerYear", e.target.value)}
            placeholder="2500000"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <FieldLabel>Description</FieldLabel>
        <textarea
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          placeholder="Describe the property — layout, condition, nearby landmarks..."
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  );
}

function StepAmenities({
  selected,
  toggle,
}: {
  selected: string[];
  toggle: (amenity: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Amenities</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Select everything that applies — listings with more amenities get more views.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {amenityOptions.map((amenity) => {
          const active = selected.includes(amenity);
          return (
            <button
              key={amenity}
              type="button"
              onClick={() => toggle(amenity)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
                active
                  ? "border-brand bg-brand-light text-brand-dark"
                  : "border-black/10 text-foreground/60 hover:border-black/20"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                  active ? "border-brand bg-brand text-white" : "border-black/20"
                }`}
              >
                {active && "✓"}
              </span>
              {amenity}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepPhotos({
  photos,
  onSelect,
}: {
  photos: string[];
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Photos</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Add up to 8 photos. Listings with clear photos get verified faster.
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/15 bg-brand-light/30 px-6 py-10 text-center transition hover:border-brand">
        <span className="text-3xl">📷</span>
        <span className="mt-2 text-sm font-medium text-foreground/70">
          Click to upload photos
        </span>
        <span className="mt-1 text-xs text-foreground/40">PNG or JPG, up to 8 photos</span>
        <input type="file" accept="image/*" multiple onChange={onSelect} className="hidden" />
      </label>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {photos.map((name, i) => (
            <motion.div
              key={`${name}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex aspect-square flex-col items-center justify-center rounded-lg bg-linear-to-br from-emerald-400 to-emerald-600 p-2 text-center"
            >
              <span className="line-clamp-2 text-[10px] text-white/90">{name}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function StepReview({ data }: { data: FormData }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Review Your Listing</h2>
        <p className="mt-1 text-sm text-foreground/60">
          Double-check everything before you submit for verification.
        </p>
      </div>

      <div className="space-y-4 rounded-xl bg-brand-light/40 p-5 text-sm">
        <ReviewRow label="Type" value={data.propertyType || "—"} />
        <ReviewRow label="Location" value={`${data.address || "—"}, ${data.city}, ${data.state}`} />
        <ReviewRow
          label="Bed / Bath"
          value={`${data.bedrooms || "—"} bed · ${data.bathrooms || "—"} bath`}
        />
        <ReviewRow
          label="Price"
          value={data.pricePerYear ? `₦${Number(data.pricePerYear).toLocaleString("en-NG")}/year` : "—"}
        />
        <ReviewRow
          label="Amenities"
          value={data.amenities.length ? data.amenities.join(", ") : "None selected"}
        />
        <ReviewRow label="Photos" value={`${data.photos.length} uploaded`} />
      </div>

      <p className="text-xs text-foreground/40">
        Your listing will go live after our team verifies the details — usually within 24 hours.
      </p>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-black/5 pb-3 last:border-0 last:pb-0">
      <span className="shrink-0 font-medium text-foreground/50">{label}</span>
      <span className="text-right text-foreground/80">{value}</span>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-2xl border border-black/5 bg-white p-10 text-center shadow-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-light"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a7d3f" strokeWidth="3">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </motion.div>
      <h2 className="mt-5 text-xl font-bold text-foreground">Listing Submitted!</h2>
      <p className="mt-2 text-sm text-foreground/60">
        Our team will verify your property and it&apos;ll go live within 24 hours. We&apos;ll
        notify you by email once it&apos;s approved.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onReset}
          className="rounded-lg border border-brand px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-light"
        >
          List Another Property
        </button>
        <Link
          href="/dashboard"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Go to Dashboard
        </Link>
      </div>
    </motion.div>
  );
}
