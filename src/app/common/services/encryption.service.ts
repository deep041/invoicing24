import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const IV_LENGTH = 12;

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    private keyPromise: Promise<CryptoKey> | null = null;

    isEnabled(): boolean {
        return environment.encryptionEnabled && !!environment.encryptionKey;
    }

    async encrypt(data: unknown): Promise<string> {
        const key = await this.getKey();
        const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
        const plaintext = new TextEncoder().encode(JSON.stringify(data));
        const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
        const payload = new Uint8Array(iv.length + ciphertext.byteLength);

        payload.set(iv);
        payload.set(new Uint8Array(ciphertext), iv.length);

        return this.arrayBufferToBase64(payload);
    }

    async decrypt<T = unknown>(encryptedBase64: string): Promise<T> {
        const key = await this.getKey();
        const payload = this.base64ToArrayBuffer(encryptedBase64);
        const iv = payload.slice(0, IV_LENGTH);
        const ciphertext = payload.slice(IV_LENGTH);
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);

        return JSON.parse(new TextDecoder().decode(decrypted)) as T;
    }

    private async getKey(): Promise<CryptoKey> {
        if (!this.keyPromise) {
            this.keyPromise = this.importKey();
        }

        return this.keyPromise;
    }

    private async importKey(): Promise<CryptoKey> {
        const encoded = new TextEncoder().encode(environment.encryptionKey);
        const hash = await crypto.subtle.digest('SHA-256', encoded);

        return crypto.subtle.importKey('raw', hash, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
    }

    private arrayBufferToBase64(buffer: Uint8Array): string {
        let binary = '';

        for (let i = 0; i < buffer.length; i++) {
            binary += String.fromCharCode(buffer[i]);
        }

        return btoa(binary);
    }

    private base64ToArrayBuffer(base64: string): Uint8Array {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);

        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        return bytes;
    }
}
