package com.capturepictures

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.provider.MediaStore
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.FileProvider
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.File
import java.io.IOException
import android.util.Log
import android.app.AlertDialog
import android.content.Context

import java.util.UUID

class CapturePicturesModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  private var imageUri: Uri? = null
  private var promise: Promise? = null

  init {
    reactContext.addActivityEventListener(this)
  }


  override fun getName(): String {
    return NAME
  }

  private fun createImageFile(): File {
    val filename = "IMG_${UUID.randomUUID()}.png"

    // getCacheDir will auto-clean according to android docs
    val fileDir = reactContext.cacheDir

    val file = File(fileDir, filename)
    file.createNewFile()
    return file
  }

  @ReactMethod
  fun captureImage(promise: Promise) {
    val activity: Activity? = currentActivity
    if (activity == null) {
      promise.reject("NO_ACTIVITY", "Activity doesn't exist")
      return
    }

    this.promise = promise

    try {
      val imageFile = createImageFile()
      imageUri = FileProvider.getUriForFile(
        reactContext,
        "${reactContext.packageName}.fileprovider", // Use the package name from AndroidManifest
        imageFile
      )

      val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE).apply {
        putExtra(MediaStore.EXTRA_OUTPUT, imageUri)
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
      }

      activity.startActivityForResult(intent, REQUEST_IMAGE_CAPTURE)
    } catch (e: IOException) {
      promise.reject("FILE_CREATION_FAILED", "Failed to create image file: ${e.message}")
    }
  }

  fun showAlert(context: Context, title: String, message: String) {
    val builder = AlertDialog.Builder(context)
    builder.setTitle(title)
    builder.setMessage(message)
    builder.setPositiveButton("OK") { dialog, _ ->
      dialog.dismiss() // Close the dialog
    }
    builder.setNegativeButton("Cancel") { dialog, _ ->
      dialog.dismiss() // Close the dialog
    }

    // Show the dialog
    builder.create().show()
  }

  override fun onActivityResult(
    activity: Activity?,
    requestCode: Int,
    resultCode: Int,
    data: Intent?
  ) {
    if (requestCode == REQUEST_IMAGE_CAPTURE) {
      Log.e("onActivityResult", "${resultCode}")

      if (resultCode == Activity.RESULT_OK) {
        promise?.resolve(imageUri.toString())
      } else {
        promise?.reject("IMAGE_CAPTURE_FAILED")
      }
      promise = null
    }
  }

  override fun onNewIntent(intent: Intent?) {
    // Not used
  }

  companion object {
    const val NAME = "CapturePictures"
    const val REQUEST_IMAGE_CAPTURE = 1
  }
}
