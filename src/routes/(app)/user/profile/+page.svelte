<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppwriteService } from '$lib/AppwriteService';
	import { authStore } from '$lib/stores/authStore';

	async function onLogout() {
		await AppwriteService.logout();
		authStore.set(null);
		goto('/');
	}
</script>

<h1 class="heading-level-1 u-color-text-pink u-margin-block-start-40">Hi, {$authStore?.name}.</h1>

<img
	class="u-block u-margin-block-start-40"
	width="64"
	src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABAAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+qF9q0NnlB+8l/ug9PrSatf/AGO3Cof3r8D2HrXLEliSTknqTQBen1i8mPEnlr6Jx+tVWuJ3+9NIfqxqKigCVbmdPuzSD6MatwazeQnl/MX0cZ/Ws+igDrLHVIb35R8kv9w9/pV6uGVijBlJBHII7V1el33222+b/Wpw3v70AYGqzmfUJT2Q7R+FUqdI2+RmPUkmm0AKASQAMk10lnokEcQa4XzJCOQTwK563cR3Ebt0VgT+ddqrBlDKcgjIIoAyb7RIXiZ7ZdkgGdoPDVzldw7rGjOxwqjJNcTKweV3AwGYnFADav6POYNRQfwyfKf6frVCpbdtlzE3o4P60AMddkjKexIptXdVgMGoSjsx3D8arQwSXEojiUsxoAjq7a6rc2ibFYMnZWGcVr2mhQxANcHzH9P4R/jWkkEMYwkSL9FAoA5W71S5vF2OwVP7qjANU67Z7eGUYeJG+qisu80KKQFrY+W3908g/wCFAHO1JbruuYl9XA/WklieGQxyKVYdQauaPAZ9RjP8KfOfw/8Ar0AbWr2Bu4A8Y/ex9PcelY+l362EzLKnytwTjla6ms6+0iG7JdT5cvqBwfrQBeimjnQPE4dfUGn1yz6dqFm+6NX/AN6I0DUtTi4Lvx/eT/61AHU1HNPFbpvlcIvvXNHUdTm+UPJ/wFMfyFCaZf3j7pFYf7Up/wAmgBupXg1C5Xy48BeF45atzSrH7HbZcfvX5b29qLHSobPDn95L/ePb6VfoA//Z"
	alt=""
/>

<section class="u-margin-block-start-40">
	<header class="u-flex u-flex-wrap u-gap-32 u-padding-block-12 u-sep-block-end">
		<h2 class="heading-level-2 u-margin-inline-end-auto">Account Details</h2>
		<a href="" class="link">Change Password</a>
		<a href="" class="link">Edit Account</a>
	</header>
	<table class="user-table">
		<tr>
			<th style="width:100px">Name</th>
			<td class="u-bold">{$authStore?.name}</td>
		</tr>
		<th>Email</th>
		<td><a href={`mailto:${authStore?.email}`} class="link">{$authStore?.email}</a></td>
	</table>
	<div class="u-flex u-margin-block-start-64">
		<button on:click={onLogout} class="button u-margin-inline-start-auto">
			<span class="text">Logout</span>
		</button>
	</div>
</section>

<style lang="scss">
	.user-table {
		margin-block-start: 24px;
		th {
			width: 180px;
			padding-block: 8px;
		}
	}
</style>
